import os
from flask import Flask, render_template, send_from_directory
from config import Config
from backend.entity import db
from backend.entity.user import User
from backend.entity.product import Product
from backend.entity.wishlist import Wishlist
from backend.entity.order import Order
from backend.entity.address import UserAddress
from backend.entity.card import SavedCard
from backend.controller.user_controller import user_bp
from backend.controller.product_controller import product_bp
from backend.controller.recommendation_controller import recommendation_bp
from backend.controller.wishlist_controller import wishlist_bp
from backend.controller.payment_controller import payment_bp

def create_app(testing=False):
    # Set template folder and static folder to the root frontend directory
    app = Flask(__name__, 
                template_folder=os.path.abspath('frontend'),
                static_folder=os.path.abspath('frontend'),
                static_url_path='')
    
    app.config.from_object(Config)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    if testing:
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.abspath('test_database.db')
    
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(user_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(recommendation_bp)
    app.register_blueprint(wishlist_bp)
    app.register_blueprint(payment_bp)
    
    # Front-end Routes (supporting extension and non-extension mappings)
    @app.route('/')
    @app.route('/dashboard.html')
    def index():
        return render_template('dashboard.html')
        
    @app.route('/login')
    @app.route('/login.html')
    def login_page():
        return render_template('login.html')
        
    @app.route('/register')
    @app.route('/register.html')
    def register_page():
        return render_template('register.html')
        
    @app.route('/products')
    @app.route('/products.html')
    def products_page():
        return render_template('products.html')
        
    @app.route('/chatbot')
    @app.route('/chatbot.html')
    def chatbot_page():
        return render_template('chatbot.html')

    @app.route('/profile')
    @app.route('/profile.html')
    def profile_page():
        return render_template('profile.html')

    @app.route('/payment')
    @app.route('/payment.html')
    def payment_page():
        return render_template('payment.html')

    @app.route('/product-details')
    @app.route('/product-details.html')
    def product_details_page():
        return render_template('product-details.html')

    # Seed Database Function
    if not testing:
        with app.app_context():
            db.create_all()
            try:
                with db.engine.begin() as conn:
                    # Check columns in users table
                    result = conn.execute(db.text("PRAGMA table_info(users)"))
                    columns = [row[1] for row in result.fetchall()]
                    if 'phone' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN phone VARCHAR(20)"))
                    if 'address' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN address TEXT"))
                    if 'created_at' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN created_at DATETIME"))
                    if 'two_factor_enabled' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN two_factor_enabled BOOLEAN DEFAULT 0"))
                    if 'marketing_consent' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN marketing_consent BOOLEAN DEFAULT 1"))
                    if 'analytics_consent' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN analytics_consent BOOLEAN DEFAULT 1"))
                    if 'phone_verified' not in columns:
                        conn.execute(db.text("ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT 0"))
                    
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

def seed_data():
    if Product.query.count() > 0:
        return
        
    products = [
        # Laptops
        Product(
            name="Acer Nitro V Gaming Laptop",
            category="laptop",
            brand="Acer",
            price=54990.00,
            rating=4.3,
            description="Intel Core i5-13420H, 16GB DDR5, 512GB SSD, NVIDIA RTX 3050, 144Hz FHD Display. Excellent gaming laptop under a budget.",
            stock=10
        ),
        Product(
            name="ASUS TUF Gaming A15",
            category="laptop",
            brand="ASUS",
            price=49999.00,
            rating=4.4,
            description="AMD Ryzen 5 7535HS, 8GB DDR5, 512GB SSD, NVIDIA RTX 2050, 144Hz Refresh Rate. Rugged military-grade durability, perfect for coding and light gaming.",
            stock=8
        ),
        Product(
            name="HP Victus 15",
            category="laptop",
            brand="HP",
            price=47900.00,
            rating=4.2,
            description="Intel Core i5-12450H, 8GB DDR4, 512GB SSD, 4GB GTX 1650 Graphics, 144Hz. Sleek and minimal design, perfect for coding and programming.",
            stock=12
        ),
        Product(
            name="Lenovo IdeaPad Slim 3",
            category="laptop",
            brand="Lenovo",
            price=35990.00,
            rating=4.1,
            description="Intel Core i3-1215U, 8GB RAM, 512GB SSD, 15.6 inch FHD, Windows 11. Lightweight build for daily office tasks and basic learning.",
            stock=15
        ),
        Product(
            name="Apple MacBook Air M2",
            category="laptop",
            brand="Apple",
            price=89900.00,
            rating=4.8,
            description="Apple M2 chip, 8GB Unified Memory, 256GB SSD, 13.6-inch Liquid Retina Display, Backlit Keyboard, FaceTime HD Camera. Ultra-thin premium laptop with silent fanless operation.",
            stock=5
        ),
        Product(
            name="Dell Inspiron 3520",
            category="laptop",
            brand="Dell",
            price=43500.00,
            rating=4.0,
            description="Intel Core i5-1235U, 8GB RAM, 512GB SSD, 15.6 FHD 120Hz display. Sturdy programming laptop with comfortable typing key travel.",
            stock=14
        ),
        
        # Phones
        Product(
            name="Samsung Galaxy M35 5G",
            category="phone",
            brand="Samsung",
            price=18999.00,
            rating=4.3,
            description="6000mAh Battery, 50MP Triple Camera, Exynos 1380 5G Processor, 120Hz Super AMOLED Display, 6GB RAM, 128GB Storage. Monster battery life.",
            stock=20
        ),
        Product(
            name="Redmi Note 14 5G",
            category="phone",
            brand="Redmi",
            price=16999.00,
            rating=4.2,
            description="MediaTek Dimensity 6080, 6GB RAM, 128GB Storage, 120Hz AMOLED Screen, 50MP AI Dual Camera, 33W Fast Charging. Value king under 20k.",
            stock=25
        ),
        Product(
            name="Realme Narzo 70 Turbo",
            category="phone",
            brand="Realme",
            price=14999.00,
            rating=4.4,
            description="Dimensity 7300 Energy Chipset, 45W Ultra Charge, 50MP Eye-detail Camera, 120Hz Smooth Display. Unrivaled performance at ₹15,000.",
            stock=18
        ),
        Product(
            name="OnePlus Nord CE4 Lite",
            category="phone",
            brand="OnePlus",
            price=19999.00,
            rating=4.1,
            description="Snapdragon 695 5G, 8GB RAM, 128GB Storage, 80W SUPERVOOC charging, 5500mAh battery. OxygenOS clean software experience.",
            stock=15
        ),
        Product(
            name="Apple iPhone 15 Pro",
            category="phone",
            brand="Apple",
            price=119900.00,
            rating=4.9,
            description="Titanium design, A17 Pro chip, Action button, 48MP Main Camera, 120Hz ProMotion display, USB-C support. Absolute peak performance.",
            stock=4
        ),
        
        # Headphones
        Product(
            name="Sony WH-1000XM5",
            category="headphone",
            brand="Sony",
            price=26990.00,
            rating=4.8,
            description="Industry Leading Active Noise Cancelling Wireless Over Ear Headphones, 30 Hr Battery Life, multipoint connection. High resolution audio.",
            stock=6
        ),
        Product(
            name="Bose QuietComfort Wireless",
            category="headphone",
            brand="Bose",
            price=24900.00,
            rating=4.7,
            description="Legendary noise cancelling headphones, high fidelity audio, custom modes, adjustable EQ, 24 hr battery. Unmatched comfort.",
            stock=8
        ),
        Product(
            name="boat Rockerz 450",
            category="headphone",
            brand="boAt",
            price=1299.00,
            rating=4.0,
            description="Wireless Bluetooth Over Ear Headphones with Mic, 15 hours playtime, 40mm dynamic drivers. Super extra bass.",
            stock=50
        ),
        Product(
            name="JBL Tune 760NC",
            category="headphone",
            brand="JBL",
            price=5999.00,
            rating=4.3,
            description="Wireless Over-Ear Active Noise Cancelling Headphones, Pure Bass Sound, 35h battery life with ANC, Multi-Point Connection.",
            stock=30
        ),
        
        # Monitors
        Product(
            name="LG UltraGear Gaming Monitor",
            category="monitor",
            brand="LG",
            price=12499.00,
            rating=4.5,
            description="24 inch Full HD (1920x1080) IPS Panel, 144Hz, 1ms Response Time, AMD FreeSync Premium, HDR 10, Height/Pivot/Tilt Adjustable.",
            stock=10
        ),
        Product(
            name="Dell Professional P2422H",
            category="monitor",
            brand="Dell",
            price=14500.00,
            rating=4.4,
            description="24 inch Full HD IPS Monitor, ComfortView Plus (low blue light), 60Hz, height adjustable stand. Perfect for long programming sessions.",
            stock=12
        ),
        
        # Keyboards & Mice
        Product(
            name="Keychron K2 Mechanical Keyboard",
            category="keyboard",
            brand="Keychron",
            price=7499.00,
            rating=4.6,
            description="84 keys, wireless bluetooth mechanical keyboard, hot-swappable tactile brown switches, RGB Backlight, Mac/Windows layout compatible.",
            stock=9
        ),
        Product(
            name="Logitech MX Master 3S Wireless Mouse",
            category="mouse",
            brand="Logitech",
            price=9495.00,
            rating=4.7,
            description="Ergonomic wireless mouse, MagSpeed scrolling, 8K DPI tracking on glass, quiet clicks, customizable buttons. The absolute best mouse for software developers.",
            stock=7
        ),
        
        # Sports Equipment (Bats & Balls)
        Product(
            name="Kookaburra English Willow Cricket Bat",
            category="sports",
            brand="Kookaburra",
            price=3500.00,
            rating=4.6,
            description="Premium English Willow cricket bat, lightweight pickup, dynamic sweet spot, perfect for club tournaments and training.",
            stock=12
        ),
        Product(
            name="Spalding NBA Leather Basketball",
            category="sports",
            brand="Spalding",
            price=2499.00,
            rating=4.5,
            description="Official composite leather basketball, excellent grip, deep channels for control, durable structure for indoor/outdoor courts.",
            stock=20
        ),
        
        # Food & Groceries
        Product(
            name="Organic Whole Grain White Quinoa",
            category="food",
            brand="Organic India",
            price=399.00,
            rating=4.4,
            description="High-protein, gluten-free, 100% organic quinoa seeds. Great source of fiber, vitamins, and minerals for healthy foods.",
            stock=40
        ),
        Product(
            name="Hershey's Pure Cocoa Baking Powder",
            category="food",
            brand="Hershey's",
            price=249.00,
            rating=4.3,
            description="100% natural unsweetened cocoa powder. Perfect for baking rich chocolate foods, cakes, cookies, and chocolate beverages.",
            stock=35
        ),
        
        # Home Appliances
        Product(
            name="Philips Air Fryer Digital HD9252",
            category="appliance",
            brand="Philips",
            price=7999.00,
            rating=4.7,
            description="Digital air fryer with Rapid Air technology, 4.1L capacity. Prepare healthy foods using 90% less oil.",
            stock=15
        ),
        Product(
            name="Dyson V8 Absolute Cord-Free Vacuum",
            category="appliance",
            brand="Dyson",
            price=32900.00,
            rating=4.8,
            description="Powerful cord-free stick vacuum cleaner. Lightweight build, easily converts to handheld, deep cleans carpets and floors.",
            stock=8
        )
    ]
    
    for p in products:
        db.session.add(p)
    db.session.commit()
    print("Database successfully seeded with realistic mock products.")

    # Seed default login credentials
    if User.query.count() == 0:
        admin_user = User(name="Default Admin", email="admin@shopping.com", is_admin=True)
        admin_user.set_password("adminpassword")
        
        normal_user = User(name="Default User", email="user@shopping.com", is_admin=False)
        normal_user.set_password("userpassword")
        
        db.session.add(admin_user)
        db.session.add(normal_user)
        db.session.commit()
        print("Database successfully seeded with default login accounts.")

app = create_app()

if __name__ == '__main__':
    host = os.environ.get('APP_HOST', '127.0.0.1')
    port = int(os.environ.get('APP_PORT', 5000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'True').lower() in ['true', '1']
    
    # Avoid reloader signal crash when run inside non-main threads (like Streamlit or certain test runners)
    import threading
    is_main_thread = threading.current_thread() is threading.main_thread()
    
    print(f"Unified Server running on http://{host}:{port}...")
    app.run(host=host, port=port, debug=debug_mode, use_reloader=(debug_mode and is_main_thread))


