from flask import Blueprint, jsonify
from ..models import FoundItem, db

disp_found_bp = Blueprint("found_disp", __name__)

@disp_found_bp.route("/api/admin/found", methods=["GET"])
def disp_found():

    # ✅ ONLY pending items
    found_items = FoundItem.query.filter_by(status="Pending").all()

    return jsonify({
        "found_items": [
            {
                "id": item.id,
                "item_name": item.item_name,
                "category": item.category,
                "brand": item.brand,
                "color": item.color,
                "date": item.date,
                "time": item.time,
                "location": item.location,
                "description": item.description,
                "identifiers": item.identifiers,
                "contact_name": item.contact_name,
                "contact_number": item.contact_number,
                "email": item.email,
                "image": item.image,
                "user_id": item.user_id,
                "status": item.status   # ✅ IMPORTANT
            }
            for item in found_items
        ]
    }), 200

@disp_found_bp.route("/api/admin/found/<int:id>/approve", methods=["PUT"])
def approve_item(id):
    item = FoundItem.query.get(id)

    if not item:
        return jsonify({"msg": "Item not found"}), 404

    item.status = "Approved"
    db.session.commit()

    return jsonify({"msg": "Item approved"}), 200

@disp_found_bp.route("/api/admin/found/<int:id>/reject", methods=["PUT"])
def reject_item(id):
    item = FoundItem.query.get(id)

    if not item:
        return jsonify({"msg": "Item not found"}), 404

    item.status = "Rejected"
    db.session.commit()

    return jsonify({"msg": "Item rejected"}), 200