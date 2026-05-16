import os

class config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///refinder.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "super-secret-key"
    SECRET_KEY = "super-secret-key"

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")