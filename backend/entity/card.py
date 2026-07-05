from backend.entity import db

class SavedCard(db.Model):
    __tablename__ = 'saved_cards'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    cardholder_name = db.Column(db.String(100), nullable=False)
    card_number_masked = db.Column(db.String(30), nullable=False)
    card_brand = db.Column(db.String(20), nullable=False)
    expiry = db.Column(db.String(10), nullable=False)

    # Relationship
    user = db.relationship('User', backref=db.backref('cards', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.id,
            'user_id': self.user_id,
            'cardholder_name': self.cardholder_name,
            'card_number_masked': self.card_number_masked,
            'card_brand': self.card_brand,
            'expiry': self.expiry
        }
