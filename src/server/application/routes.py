import os
import json
import datetime
import requests
from flask import Blueprint,request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from openai import OpenAI
from dotenv import load_dotenv
import stripe
from .models import Users, Recipes, Plans, Favorites, db

load_dotenv()
client = OpenAI(
    api_key=os.environ.get('OPENAI_API_KEY')
)

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
endpoint_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')


routes = Blueprint('routes',__name__)
bcrypt = Bcrypt()

@routes.route('/', methods=['GET'])
def home():
    return 'Hello'

@routes.route('/generate/recipe', methods=['POST'])
def handle_recipe_request():
    response_body = {}
    data = request.json
    print(data)
    if not data:
        response_body['message'] = 'Please provide data to process request.'
        return response_body
    required_keys = ['meal', 'prepTime' 'diet', 'dishIngredients']
    new_recipe = client.chat.completions.create(
    model="gpt-3.5-turbo", messages=[ {"role": "user", "content": f"JSON format(keys: recipe_name, recipe_description, prep_time, diet, nutritional_values, ingredients (as array of ), directions (in array), course) healthy recipe for {data['meal']} in {data['prepTime']} minutes for {data['diet']} diet, with {data['dishIngredients']}"}])
    recipe_message = new_recipe.choices[0].message
    recipe_data = json.loads(recipe_message.content)
    print(recipe_data)
    existing_recipe = db.session.query(Recipes).filter_by(recipe_name=recipe_data['recipe_name']).first()
    if existing_recipe:
        response_body['results'] = existing_recipe.serialize()
        response_body['message'] = 'Recipe created, but not added to database. Recipe with same name already existing.'
        return jsonify(response_body)
    new_recipe = Recipes(
        recipe_name=recipe_data['recipe_name'],
        course=recipe_data['course'],
        diet=recipe_data['diet'],
        recipe_ingredients=json.dumps(recipe_data['ingredients']),
        recipe_directions=json.dumps(recipe_data['directions']),
        preparation_time=recipe_data['prep_time'],
        nutritional_values=json.dumps(recipe_data['nutritional_values'])
    )
    db.session.add(new_recipe)
    db.session.commit()
    response_body['results'] = new_recipe.serialize()
    return jsonify(response_body)

@routes.route('/signup', methods=['POST'])
def handle_signup():
    response_body = {}
    data = request.json
    if not data:
        response_body['message'] = 'Signup data missing'
        return response_body,400
    if not data["name"]:
        response_body['message'] = 'Name is a required field!'
        return response_body,400
    if not data["last_name"]:
        response_body['message'] = 'Last name is a required field!'
        return response_body,400
    if not data["email"]:
        response_body['message'] = 'Email is a required field!'
        return response_body,400
    if not data["password"]:
        response_body['message'] = 'Password is a required field!'
        return response_body,400
    password = data['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Users(
        name = data['name'],
        last_name = data['last_name'],
        email = data['email'].lower(),
        password = hashed_password
        )
    db.session.add(new_user)
    db.session.commit()
    response_body['message'] = 'User successfully created!'
    response_body['results'] = new_user.serialize()
    return response_body

@routes.route('/login', methods=['POST'])
def handle_login():
    response_body = {}
    data = request.json
    if not data:
        response_body['message'] = 'Login data missing!'
        return response_body,400
    if not data['email']:
        response_body['message'] = 'Email is a mandatory field!'
        return response_body,400
    if not data['password']:
        response_body['message'] = 'Password is a mandatory field!'
        return response_body,400
    logged_user = db.session.query(Users).filter_by(email=data['email']).first()
    if not logged_user:
        response_body['message'] = 'User not found. Please try with a different email.'
        return response_body,404
    password = data['password']
    if not bcrypt.check_password_hash(logged_user.password, password):
        response_body['message'] = f'Wrong password for email {user.email}'
        return response_body, 401
    expires = datetime.timedelta(minutes=60)
    access_token = create_access_token(identity={'user_id': logged_user.id,
                                                 'user_email':logged_user.email},
                                                expires_delta=expires)
    response_body['message'] = f'{logged_user.email} successfully logged in!'
    response_body['results'] = logged_user.serialize()
    response_body['token'] = access_token
    return response_body,200

@routes.route('/user/<int:id>', methods=['PATCH', 'DELETE'])
@jwt_required()
def handle_user(id):
    response_body = {}
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']
    print(current_user_id)
    if current_user_id != id:
        response_body['message'] = 'Action not allowed.'
        return response_body, 405
    user = db.session.query(Users).filter_by(id=id).first()
    if not user:
        response_body['message'] = 'User not found.'
        return response_body,404
    if request.method == 'PATCH':
        data = request.json
        if not data:
            response_body['message'] = 'Data missing. Please provide details for user update'
            return response_body,400
        if data['name']:
            user.name = data['name']
        db.session.add(user)
        db.session.commit()
        response_body['message'] = f'User ID {id} successfully updated'
        response_body['results'] = user.serialize()
        return response_body,200
    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'User ID {id} successfully deleted.'
        return response_body,200
    
@routes.route('/recipes', methods=['GET'])
def handle_recipes():
    response_body = {}
    recipes = db.session.query(Recipes).all()
    if not recipes:
        response_body['message'] = 'No recipe found in the database.'
        return response_body, 404
    response_body['results'] = [recipe.serialize() for recipe in recipes]
    response_body['message'] = 'Recipes in database.'
    return response_body, 200      

@routes.route('/favorites', methods=['POST', 'GET', 'DELETE'])
@jwt_required()
def handle_favorites():
    response_body = {}
    current_user = get_jwt_identity()
    if not current_user:
        response_body['message'] = 'User data not found'
    id = current_user['user_id']
    if request.method == "POST":
        data = request.json
        if not data:
            response_body['message'] = 'Favorite data missing!'
            return response_body,400
        if not data['user_id']:
            response_body['message'] = 'User ID is mandatory!'
            return response_body,400
        if not data['recipe_id']:
            response_body['message'] = 'Recipe ID is mandatory!'
            return response_body,400
        user = db.session.query(Users).filter_by(id=data['user_id']).first()
        if not user:
            response_body['message'] = 'User not found'
            return response_body,404
        recipe = db.session.query(Recipes).filter_by(id=data['recipe_id']).first()
        if not recipe:
            response_body['message'] = 'Recipe not found'
            return response_body,404
        current_favorites = db.session.query(Favorites).filter_by(user_id=data['user_id'], recipe_id=data['recipe_id']).first()
        if current_favorites:
            response_body['message'] = 'Recipe already added to favorites.'
            return response_body,400
        new_favorite = Favorites(
            user_id = user.id,
            recipe_id = recipe.id
        )
        print(new_favorite)
        db.session.add(new_favorite)
        db.session.commit()
        response_body['message'] = 'New favorite recipe created!'
        response_body['results'] = new_favorite.serialize()
        return response_body,202
    if request.method == "GET":
        user_id = id
        user = db.session.query(Users).filter_by(id=user_id).first()
        if not user:
            response_body['message'] = 'User not found.'
            return response_body, 404
        user_favorites = db.session.query(Favorites).filter_by(user_id=user_id).all()
        if not user_favorites:
            response_body['message'] = f'No favorite found for {user.id}.'
            return response_body, 404
        favorite_recipes = []
        for favorite in user_favorites:
            recipe = db.session.query(Recipes).filter_by(id=favorite.recipe_id).first()
            favorite_recipes.append(recipe.serialize())
        print(favorite_recipes)
        response_body['message'] = f'Favorite recipes for user {user.id}'
        response_body['results'] = favorite_recipes
        return response_body,200
    if request.method == "DELETE":
        data = request.json
        if not data:
            response_body['message'] = 'Data missing.'
            return response_body,400
        if not data['recipe_id']:
            response_body['message'] = 'Favorite data missing: recipe_id.'
            return response_body,400
        if not data['user_id']:
            response_body['message'] = 'Favorite data missing: user_id.'
            return response_body,400
        favorite = db.session.query(Favorites).filter_by(recipe_id=data['recipe_id'], user_id=data['user_id']).first()
        if not favorite:
            response_body['message'] = 'Favorite recipe not found.'
            return response_body,404
        db.session.delete(favorite)
        db.session.commit()
        response_body['message'] = f'Favorite {favorite.id} removed from user {favorite.user_id}'
        return response_body,200
            

@routes.route('/premium-recipe', methods=['POST'])
def handle_new_recipe():
    response_body = {}
    data = request.json
    # Required data: q=ingredients,diet=diet,health=[alergies],mealType=meal,calories=maxCalories,time=time
    url = f"https://api.edamam.com/api/recipes/v2?type=any&beta=false&q={data['dishIngredients']}&app_id={edamam_app_id}&app_key={edamam_app_key}&diet={data['diet']}&health={data['dietaryPreferences']}&mealType={data['meal']}&calories={data['calories']}&time={data['prepTime']}"
    print(url)
    req = requests.get(url=url)
    results = req.json()
    print(jsonify(results))
    response_body['message'] = 'Premium Recipe Created'
    response_body['results'] = results
    return response_body,201


@routes.route('/payment', methods=['POST'])
def handle_payment():
    response_body = {}
    data = request.json
    if not data:
        response_body['message'] = 'Payment data missing.'
        return response_body, 400
    if not data['email']:
        response_body['message'] = 'Customer email data missing.'
        return response_body, 400
    intent = stripe.PaymentIntent.create(
            amount=599,
            currency="usd",
            receipt_email=data['email'],
            automatic_payment_methods={"enabled": True})
    client_secret = intent['client_secret']
    response_body['client_secret'] = client_secret
    return response_body

@routes.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data

    try:
        event = json.loads(payload)
    except json.decoder.JSONDecodeError as e:
        print('⚠️  Webhook error while parsing basic request.' + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return jsonify(success=False)

    # Handle the event
    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
        print('Payment for {} succeeded'.format(payment_intent['amount']))
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)