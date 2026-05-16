from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

from .extensions import db, jwt


def create_app():
    app = Flask(__name__)

    app.config.from_object("config.config")

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes.auth_routes import auth_bp
    from .routes.lost_routes import lost_bp
    from .routes.found_routes import found_bp
    from .routes.display_admin_lost_routes import disp_lost_bp
    from .routes.display_admin_found_routes import disp_found_bp
    from .routes.public_routes import public_bp
    from .routes.my_items_routes import myitems_bp
    from .routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(lost_bp)
    app.register_blueprint(found_bp)
    app.register_blueprint(disp_lost_bp)
    app.register_blueprint(disp_found_bp)
    app.register_blueprint(public_bp)
    app.register_blueprint(myitems_bp)
    app.register_blueprint(admin_bp)

    @app.route("/uploads/<filename>")
    def uploaded_file(filename):
        return send_from_directory(
            os.path.join(app.root_path, "uploads"),
            filename
        )

    return app