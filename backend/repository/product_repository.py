from backend.entity import db
from backend.entity.product import Product

class ProductRepository:
    @staticmethod
    def get_all():
        return Product.query.all()

    @staticmethod
    def get_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def search(query=None, category=None, brand=None, max_price=None):
        q = Product.query
        if query:
            q = q.filter((Product.name.like(f"%{query}%")) | (Product.description.like(f"%{query}%")))
        if category:
            q = q.filter_by(category=category)
        if brand:
            q = q.filter_by(brand=brand)
        if max_price is not None:
            q = q.filter(Product.price <= max_price)
        return q.all()

    @staticmethod
    def save(product):
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def delete(product):
        db.session.delete(product)
        db.session.commit()
