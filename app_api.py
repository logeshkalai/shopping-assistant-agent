import os
from flask import Flask
from config import Config
from backend.entity import db
from backend.entity.user import User
from backend.entity.product import Product
from backend.entity.wishlist import Wishlist
from backend.entity.order import Order
from backend.controller.user_controller import user_bp
from backend.controller.product_controller import product_bp
from backend.controller.recommendation_controller import recommendation_bp
from backend.controller.wishlist_controller import wishlist_bp
from backend.controller.payment_controller import payment_bp
from app import seed_data

def create_api_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(user_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(recommendation_bp)
    app.register_blueprint(wishlist_bp)
    app.register_blueprint(payment_bp)
    
    with app.app_context():
        db.create_all()
        try:
            with db.engine.begin() as conn:
                result = conn.execute(db.text("PRAGMA table_info(users)"))
                columns = [row[1] for row in result.fetchall()]
                if 'phone' not in columns:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN phone VARCHAR(20)"))
                if 'address' not in columns:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN address TEXT"))
                if 'created_at' not in columns:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN created_at DATETIME"))

                # Check columns in products table
                result_prod = conn.execute(db.text("PRAGMA table_info(products)"))
                columns_prod = [row[1] for row in result_prod.fetchall()]
                if 'image_url' not in columns_prod:
                    conn.execute(db.text("ALTER TABLE products ADD COLUMN image_url VARCHAR(500)"))
                if 'specs' not in columns_prod:
                    conn.execute(db.text("ALTER TABLE products ADD COLUMN specs TEXT"))
                if 'features' not in columns_prod:
                    conn.execute(db.text("ALTER TABLE products ADD COLUMN features TEXT"))
        except Exception as e:
            print("Database migration check:", e)
        seed_data()
        
    return app

if __name__ == '__main__':
    app = create_api_app()
    host = os.environ.get('BACKEND_HOST', '127.0.0.1')
    port = int(os.environ.get('BACKEND_PORT', 5000))
    print(f"Backend API Data Server running on http://{host}:{port}...")
    app.run(host=host, port=port, debug=True)
