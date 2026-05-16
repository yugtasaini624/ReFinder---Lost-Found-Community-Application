from flask import Blueprint, jsonify
from ..models import User, db, LostItem, FoundItem, SuccessStory
from ..extensions import db
from sqlalchemy import func

admin_bp = Blueprint("admin", __name__)


# 👤 GET ALL USERS (Admin view)
@admin_bp.route("/api/admin/users", methods=["GET"])
def get_users():
    users = User.query.all()

    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        }
        for u in users
    ])


# 🗑️ DELETE USER (permanent account removal)
@admin_bp.route("/api/admin/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "User deleted permanently"
    })

@admin_bp.route("/api/admin/stats", methods=["GET"])
def get_stats():

    total_users = User.query.count()
    total_lost = LostItem.query.count()
    total_found = FoundItem.query.count()

    # Example category grouping (simple version)
    categories = db.session.query(
        LostItem.category,
        db.func.count(LostItem.id)
    ).group_by(LostItem.category).all()

    category_data = [
        {"name": c[0], "value": c[1]} for c in categories
    ]

    # Monthly users (simple mock grouping)
    monthly_users = [
        {"month": "Jan", "Users": 10},
        {"month": "Feb", "Users": 20},
        {"month": "Mar", "Users": 15},
        {"month": "Apr", "Users": 25},
        {"month": "May", "Users": 18},
    ]

    return jsonify({
        "summary": {
            "users": total_users,
            "lost": total_lost,
            "found": total_found
        },
        "lost_found": [
            {"name": "Lost", "value": total_lost},
            {"name": "Found", "value": total_found}
        ],
        "categories": category_data,
        "monthly_users": monthly_users
    })

@admin_bp.route("/api/admin/dashboard", methods=["GET"])
def dashboard():

    users = User.query.count()

    lost_total = LostItem.query.count()
    found_total = FoundItem.query.count()

    pending = (
        LostItem.query.filter_by(status="Pending").count()
        + FoundItem.query.filter_by(status="Pending").count()
    )

    # CATEGORY DATA (REAL)
    category_data = db.session.query(
        LostItem.category,
        func.count(LostItem.id)
    ).group_by(LostItem.category).all()

    categories = [
        {"name": c[0] or "Other", "value": c[1]}
        for c in category_data
    ]

    lost_found = [
        {"name": "Lost", "value": lost_total},
        {"name": "Found", "value": found_total},
    ]

    # ✅ REAL ACTIVITY WITHOUT created_at
    # We use ID DESC = newest entries first

    lost_recent = LostItem.query.order_by(LostItem.id.desc()).limit(5).all()
    found_recent = FoundItem.query.order_by(FoundItem.id.desc()).limit(5).all()

    combined = []

    for r in lost_recent:
        combined.append({
            "user": r.contact_name,
            "action": "Posted Lost Item",
            "item": r.item_name,
            "status": r.status
        })

    for r in found_recent:
        combined.append({
            "user": r.contact_name,
            "action": "Posted Found Item",
            "item": r.item_name,
            "status": r.status
        })

    # Keep latest 10 items (based on ID order)
    combined = combined[:10]

    return jsonify({
        "summary": {
            "users": users,
            "lost": lost_total,
            "found": found_total,
            "pending": pending
        },
        "lost_found": lost_found,
        "categories": categories,
        "activity": combined
    })