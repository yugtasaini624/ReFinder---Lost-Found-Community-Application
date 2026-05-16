from .extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String(350), nullable=False)
    role = db.Column(db.String(20), default="user")

class LostItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    item_name = db.Column(db.String(50))
    category = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    color = db.Column(db.String(50))
    date = db.Column(db.String(50))
    time = db.Column(db.String(50))
    location = db.Column(db.String(200))
    description = db.Column(db.String(300))
    identifiers = db.Column(db.String(200))

    contact_name = db.Column(db.String(100))
    contact_number = db.Column(db.String(20))
    email = db.Column(db.String(100))

    image = db.Column(db.String(300))
    status = db.Column(db.String(50), default="Pending")

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class FoundItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    item_name = db.Column(db.String(100))
    category = db.Column(db.String(50))
    brand = db.Column(db.String(100))
    color = db.Column(db.String(50))
    date = db.Column(db.String(50))
    time = db.Column(db.String(50))
    location = db.Column(db.String(200))
    description = db.Column(db.String(300))
    identifiers = db.Column(db.String(200))

    contact_name = db.Column(db.String(100))
    contact_number = db.Column(db.String(20))
    email = db.Column(db.String(100))
    status = db.Column(db.String(50), default="Pending")
    image = db.Column(db.String(300))

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

class SuccessStory(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(300), nullable=False)

    status = db.Column(db.String(20), default="Pending")  # backend only use

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Column(db.DateTime, default=db.func.now())