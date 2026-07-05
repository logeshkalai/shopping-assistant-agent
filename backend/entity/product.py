from backend.entity import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, nullable=False, default=0.0)
    description = db.Column(db.Text, nullable=True)
    stock = db.Column(db.Integer, nullable=False, default=0)

    def to_dict(self):
        return {
            'product_id': self.id,
            'name': self.name,
            'category': self.category,
            'brand': self.brand,
            'price': self.price,
            'rating': self.rating,
            'description': self.description,
            'stock': self.stock
        }
