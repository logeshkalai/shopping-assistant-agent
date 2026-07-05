from backend.entity import db

class Wishlist(db.Model):
    __tablename__ = 'wishlist'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), nullable=False)

    # Relationships
    user = db.relationship('User', backref=db.backref('wishlist_items', cascade='all, delete-orphan'))
    product = db.relationship('Product', backref=db.backref('wishlisted_by', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'wishlist_id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None
        }
