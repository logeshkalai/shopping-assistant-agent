from backend.entity import db
from backend.entity.order import Order

class OrderRepository:
    @staticmethod
    def get_by_user(user_id):
        return Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()

    @staticmethod
    def save(order):
        db.session.add(order)
        db.session.commit()
        return order
