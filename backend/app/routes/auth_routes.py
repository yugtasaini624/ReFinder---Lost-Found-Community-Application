from flask import Blueprint, request, jsonify
from ..models import User
from ..extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)


# =========================
# SIGNUP
# =========================
@auth_bp.route('/api/signup', methods=["POST"])
def sign_up():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # check existing user
    if User.query.filter_by(email=email).first():
        return jsonify({
            "msg": "User already exists!"
        }), 400

    # hash password
    hashed_pass = generate_password_hash(password)

    # =========================
    # ADMIN CHECK
    # =========================

    ADMIN_EMAIL = "admin12345@gmail.com"
    ADMIN_PASSWORD = "yugtasaini624123"

    if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
        role = "admin"
    else:
        role = "user"

    # create user
    user = User(
        name=name,
        email=email,
        password=hashed_pass,
        role=role
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully!"
    }), 201


# =========================
# LOGIN
# =========================
@auth_bp.route('/api/login', methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # find user
    existing_user = User.query.filter_by(email=email).first()

    # check password
    if not existing_user or not check_password_hash(existing_user.password, password):
        return jsonify({
            "msg": "Invalid email or password!"
        }), 401

    # create token
    # create token
    print("ROLE:", existing_user.role)
    token = create_access_token(
    identity=str(existing_user.id),
    additional_claims={
        "role": existing_user.role
    }
)

    # response
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": existing_user.id,
            "email": existing_user.email,
            "role": existing_user.role
        }
    }), 200

from flask_jwt_extended import jwt_required, get_jwt


@auth_bp.route("/api/verify-admin", methods=["GET"])
@jwt_required()
def verify_admin():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"msg": "Unauthorized"}), 403

    return jsonify({"msg": "Admin verified"}), 200