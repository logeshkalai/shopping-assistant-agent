from backend.entity import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    two_factor_enabled = db.Column(db.Boolean, default=False, nullable=False)
    marketing_consent = db.Column(db.Boolean, default=True, nullable=False)
    analytics_consent = db.Column(db.Boolean, default=True, nullable=False)
    phone_verified = db.Column(db.Boolean, default=False, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'user_id': self.id,
            'name': self.name,
            'email': self.email,
            'is_admin': self.is_admin,
            'phone': self.phone or '',
            'address': self.address or '',
            'created_at': self.created_at.strftime('%Y-%m-%d') if self.created_at else '',
            'two_factor_enabled': self.two_factor_enabled,
            'marketing_consent': self.marketing_consent,
            'analytics_consent': self.analytics_consent,
            'phone_verified': self.phone_verified
        }
