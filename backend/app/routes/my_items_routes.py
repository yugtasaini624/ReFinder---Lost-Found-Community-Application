from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models import LostItem, FoundItem

myitems_bp = Blueprint("myitems", __name__)

@myitems_bp.route("/api/my-items", methods=["GET"])
@jwt_required()
def get_my_items():

    current_user_id = get_jwt_identity()

    lost_items = LostItem.query.filter_by(user_id=current_user_id).all()
    found_items = FoundItem.query.filter_by(user_id=current_user_id).all()

    items = []

    # LOST ITEMS
    for item in lost_items:
        items.append({
            "id": item.id,
            "type": "Lost",
            "name": item.item_name,
            "category": item.category,
            "brand": item.brand,
            "color": item.color,
            "date": item.date,
            "time": item.time,
            "location": item.location,
            "description": item.description,
            "image": item.image,
            "status": item.status,
        })

    # FOUND ITEMS
    for item in found_items:
        items.append({
            "id": item.id,
            "type": "Found",
            "name": item.item_name,
            "category": item.category,
            "brand": item.brand,
            "color": item.color,
            "date": item.date,
            "time": item.time,
            "location": item.location,
            "description": item.description,
            "image": item.image,
            "status": item.status,
        })

    # latest first
    items = sorted(items, key=lambda x: x["id"], reverse=True)

    return jsonify({
        "success": True,
        "items": items
    })