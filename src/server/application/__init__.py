import os
from os import path
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .routes import routes
from flask_sqlalchemy import SQLAlchemy
from .models import Users, Recipes, Plans, Favorites, db

DB_NAME = 'database.db'

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] =os.environ.get('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_NAME}"
    app.register_blueprint(routes,url_prefix='/')
    db.init_app(app)
    create_database(app)
    migrate = Migrate(app, db)
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
    jwt = JWTManager(app)

    return app

def create_database(app):
    if not path.exists('server/' + DB_NAME):
        with app.app_context():
            db.create_all()