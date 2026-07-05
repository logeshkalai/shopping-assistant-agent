from backend.entity import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), default='COMPLETED', nullable=False)
    transaction_id = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = db.relationship('User', backref=db.backref('orders', cascade='all, delete-orphan'))
    product = db.relationship('Product', backref=db.backref('orders', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'order_id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'product_name': self.product.name if self.product else 'Unknown Product',
            'amount': self.amount,
            'payment_method': self.payment_method,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
