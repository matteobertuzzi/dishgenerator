import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Plans(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscription_type = db.Column(db.Enum("Free", "Premium", name="subscription_plan"), nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Plan: {self.id} - {self.subscription_type} | Price: {self.price}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'subscription_type': self.subscription_type,
            'price': self.price
        }

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    last_name = db.Column(db.String, unique=False, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    subscription_plan_id = db.Column(db.Integer, db.ForeignKey("plans.id"))
    subscription_plan = db.relationship("Plans")
    favorites = db.relationship("Favorites", back_populates="user")
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    
    def __repr__(self):
        return f'<User: {self.id} - {self.name} {self.last_name} | Email: {self.email} | Subscription Plan: {self.subscription_plan_id}>'
    
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'email': self.email,
                'subscription_plan_id': self.subscription_plan_id,
                'is_active': self.is_active}
    
class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String, unique=False, nullable=False)
    course = db.Column(db.String, unique=False, nullable=False)
    diet = db.Column(db.String, unique=False, nullable=False)
    recipe_ingredients = db.Column(db.String, unique=False, nullable=False)
    recipe_directions = db.Column(db.String, unique=False, nullable=False)
    preparation_time = db.Column(db.Integer, unique=False, nullable=False)
    nutritional_values = db.Column(db.String, unique=False, nullable=False)
    image_url = db.Column(db.String, unique=False, nullable=True)
    favorites = db.relationship("Favorites", back_populates="recipe")
    
    def __repr__(self):
        return f'<Recipe: {self.id} - {self.name} | Course: {self.course} | Diet: {self.diet} | Preparation Time: {self.preparation_time}>'
    
    def serialize(self):
        return {'id': self.id,
                'recipe_name': self.recipe_name,
                'course': self.course,
                'diet': self.diet,
                'recipe_ingredients': json.loads(self.recipe_ingredients),
                'recipe_directions': json.loads(self.recipe_directions),
                'nutritional_values': json.loads(self.nutritional_values),
                'preparation_time': self.preparation_time}
        
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    user = db.relationship("Users", back_populates="favorites")
    recipe = db.relationship("Recipes", back_populates="favorites")
    
    def __repr__(self):
        return f'<Favorite: {self.id} | User: {self.user_id} | Recipe: {self.recipe_id}>'
    
    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'recipe_id': self.recipe_id}


    