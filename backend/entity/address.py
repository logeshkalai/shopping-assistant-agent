from backend.entity import db

class UserAddress(db.Model):
    __tablename__ = 'user_addresses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    label = db.Column(db.String(50), nullable=False)
    recipient_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address_text = db.Column(db.Text, nullable=False)

    # Relationship
    user = db.relationship('User', backref=db.backref('addresses', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'address_id': self.id,
            'user_id': self.user_id,
            'label': self.label,
            'recipient_name': self.recipient_name,
            'phone': self.phone,
            'address_text': self.address_text
        }
