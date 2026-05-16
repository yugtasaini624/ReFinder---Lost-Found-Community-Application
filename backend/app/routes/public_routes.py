from flask import Blueprint, jsonify, request
from ..models import LostItem,FoundItem
from werkzeug.utils import secure_filename
import os
from ..models import db, SuccessStory

public_bp = Blueprint("lost_found_disp", __name__)

@public_bp.route("/api/public/found", methods=["GET"])
def public_found():
    found_items = FoundItem.query.filter_by(status="Approved").all()
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
                "status": item.status   
            }
            for item in found_items
        ]
    }), 200

@public_bp.route("/api/public/lost", methods=["GET"])
def public_lost():
    lost_items = LostItem.query.filter_by(status="Approved").all()
    return jsonify({
        "lost_items": [
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
                "status": item.status   
            }
            for item in lost_items
        ]
    }), 200


@public_bp.route("/api/public/lost/<int:id>", methods=["GET"])
def get_lost_item(id):
    item = LostItem.query.get(id)

    if not item or item.status != "Approved":
        return jsonify({"msg": "Not found"}), 404

    return jsonify({
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
        "status": item.status
    })


@public_bp.route("/api/public/found/<int:id>", methods=["GET"])
def get_found_item(id):
    item = FoundItem.query.get(id)

    if not item or item.status != "Approved":
        return jsonify({"msg": "Not found"}), 404

    return jsonify({
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
        "status": item.status
    })


@public_bp.route("/api/search", methods=["GET"])
def search_items():

    keyword = request.args.get("keyword", "")
    location = request.args.get("location", "")

    lost_items = LostItem.query.filter(
        LostItem.item_name.ilike(f"%{keyword}%"),
        LostItem.location.ilike(f"%{location}%"),
        LostItem.status == "Approved"
    ).all()

    found_items = FoundItem.query.filter(
        FoundItem.item_name.ilike(f"%{keyword}%"),
        FoundItem.location.ilike(f"%{location}%"),
        FoundItem.status == "Approved"
    ).all()

    items = []

    for item in lost_items:

        items.append({
            "id": item.id,
            "type": "Lost",
            "name": item.item_name,
            "description": item.description,
            "location": item.location,
            "date": item.date,
            "category": item.category,
            "image": item.image,
            "status": item.status,
        })

    for item in found_items:

        items.append({
            "id": item.id,
            "type": "Found",
            "name": item.item_name,
            "description": item.description,
            "location": item.location,
            "date": item.date,
            "category": item.category,
            "image": item.image,
            "status": item.status,
        })

    return jsonify({
        "success": True,
        "items": items
    })

@public_bp.route("/api/all-items", methods=["GET"])
def get_all_items():

    items = []

    # =========================
    # LOST ITEMS
    # =========================

    lost_items = LostItem.query.filter_by(
        status="Approved"
    ).all()

    for item in lost_items:

        items.append({

            "id": item.id,

            "type": "Lost",

            "name": item.item_name,

            "category": item.category,

            "brand": item.brand,

            "color": item.color,

            "date": item.date,

            "location": item.location,

            "description": item.description,

            "image": item.image,

            "status": item.status,
        })

    # =========================
    # FOUND ITEMS
    # =========================

    found_items = FoundItem.query.filter_by(
        status="Approved"
    ).all()

    for item in found_items:

        items.append({

            "id": item.id,

            "type": "Found",

            "name": item.item_name,

            "category": item.category,

            "brand": item.brand,

            "color": item.color,

            "date": item.date,

            "location": item.location,

            "description": item.description,

            "image": item.image,

            "status": item.status,
        })

    # LATEST FIRST

    items = sorted(
        items,
        key=lambda x: x["id"],
        reverse=True
    )

    return jsonify({
        "success": True,
        "items": items
    })


@public_bp.route("/api/user/success-story", methods=["POST"])
def add_success_story():
    title = request.form.get("title")
    description = request.form.get("description")
    image = request.files.get("image")

    print("TITLE:", title)
    print("DESC:", description)
    print("IMAGE:", image)

    if not title or not description or not image:
        return jsonify({
            "error": "Missing fields",
            "title": title,
            "description": description
        }), 400

    filename = secure_filename(image.filename)
    image.save(os.path.join("uploads", filename))

    story = SuccessStory(
        title=title,
        description=description,
        image=filename,
        user_id=1
    )

    db.session.add(story)
    db.session.commit()

    return jsonify({"message": "Success"}), 201

@public_bp.route("/api/admin/success-stories", methods=["GET"])
def get_stories():
    stories = SuccessStory.query.filter_by(status="Pending").all()

    return jsonify([
        {
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "image": s.image
        } for s in stories
    ])

@public_bp.route("/api/admin/success-stories/approve/<int:id>", methods=["PUT"])
def approve_story(id):
    story = SuccessStory.query.get(id)

    if not story:
        return jsonify({"error": "Not found"}), 404

    story.status = "Approved"
    db.session.commit()

    return jsonify({"message": "Approved"})

@public_bp.route("/api/public/success-stories", methods=["GET"])
def get_public_stories():
    stories = SuccessStory.query.filter_by(status="Approved").all()

    return jsonify([
        {
            "title": s.title,
            "description": s.description,
            "img": f"/uploads/{s.image}"
        } for s in stories
    ])

@public_bp.route("/api/admin/success-stories", methods=["GET"])
def get_pending_stories():
    stories = SuccessStory.query.filter_by(status="Pending").all()

    return jsonify([
        {
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "image": s.image
        } for s in stories
    ])

@public_bp.route("/api/admin/success-stories/reject/<int:id>", methods=["PUT"])
def reject_story(id):
    story = SuccessStory.query.get(id)

    if not story:
        return jsonify({"error": "Not found"}), 404

    story.status = "Rejected"
    db.session.commit()

    return jsonify({"message": "Rejected"})


