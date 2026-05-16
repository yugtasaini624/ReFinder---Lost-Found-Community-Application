from app.init import create_app
from app.extensions import db
from flask_cors import CORS

app = create_app()

# Enable CORS
CORS(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)