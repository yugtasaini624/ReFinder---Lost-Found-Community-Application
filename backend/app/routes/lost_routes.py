import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models import db, LostItem

lost_bp = Blueprint("lost", __name__)


# =========================
# CREATE LOST ITEM
# =========================
@lost_bp.route("/api/lost", methods=["POST"])
@jwt_required()
def create_lost_items():

    user_id = get_jwt_identity()

    file = request.files.get("image")
    filename = None

    # SAVE IMAGE
    if file:
        filename = secure_filename(file.filename)

        upload_path = os.path.join(current_app.root_path, "uploads")
        os.makedirs(upload_path, exist_ok=True)

        file.save(os.path.join(upload_path, filename))

        print("SAVED AT:", os.path.join(upload_path, filename))

    data = request.form

    item = LostItem(
        item_name=data.get("itemName"),
        category=data.get("category"),
        brand=data.get("brand"),
        color=data.get("color"),
        date=data.get("date"),
        time=data.get("time"),
        location=data.get("location"),
        description=data.get("description"),
        identifiers=data.get("identifiers"),
        contact_name=data.get("contactName"),
        contact_number=data.get("contactNumber"),
        email=data.get("email"),
        image=filename,
        user_id=user_id,
        status="Pending"
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Lost item uploaded successfully",
        "image": filename
    }), 201


# =========================
# DELETE LOST ITEM
# =========================
@lost_bp.route("/api/lost/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_lost(id):

    user_id = int(get_jwt_identity())

    item = LostItem.query.get(id)

    if not item:
        return jsonify({"msg": "Item not found"}), 404

    # SECURITY CHECK
    if item.user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 403

    db.session.delete(item)
    db.session.commit()

    return jsonify({"msg": "Deleted successfully"}), 200


# =========================
# UPDATE LOST ITEM
# =========================
@lost_bp.route("/api/lost/<int:id>", methods=["PUT"])
@jwt_required()
def update_lost_item(id):

    user_id = int(get_jwt_identity())

    item = LostItem.query.get(id)

    if not item:
        return jsonify({"msg": "Item not found"}), 404

    # SECURITY CHECK
    if item.user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.json

    item.item_name = data.get("item_name", item.item_name)
    item.category = data.get("category", item.category)
    item.brand = data.get("brand", item.brand)
    item.color = data.get("color", item.color)
    item.date = data.get("date", item.date)
    item.time = data.get("time", item.time)
    item.location = data.get("location", item.location)
    item.description = data.get("description", item.description)
    item.identifiers = data.get("identifiers", item.identifiers)
    item.contact_name = data.get("contact_name", item.contact_name)
    item.contact_number = data.get("contact_number", item.contact_number)
    item.email = data.get("email", item.email)

    # IMPORTANT:
    # whenever user edits item,
    # admin must approve again
    item.status = "Pending"

    db.session.commit()

    return jsonify({
        "msg": "Updated successfully",
        "status": "Pending"
    }), 200