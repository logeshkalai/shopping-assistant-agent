from backend.repository.user_repository import UserRepository
from backend.entity.user import User

class UserService:
    @staticmethod
    def register_user(name, email, password, is_admin=False):
        if not name or not email or not password:
            raise ValueError("All fields (name, email, password) are required.")
        
        existing = UserRepository.get_by_email(email)
        if existing:
            raise ValueError("Email already registered.")
            
        user = User(name=name, email=email, is_admin=bool(is_admin))
        user.set_password(password)
        
        return UserRepository.save(user)

    @staticmethod
    def authenticate_user(email, password):
        if not email or not password:
            raise ValueError("Email and password are required.")
            
        user = UserRepository.get_by_email(email)
        if not user or not user.check_password(password):
            return None
        return user

    @staticmethod
    def get_user_profile(user_id):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")
        return user

    @staticmethod
    def update_user_profile(user_id, name, email, phone, address, current_password, new_password=None):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")
            
        # Verify current password
        if not user.check_password(current_password):
            raise ValueError("Incorrect current password.")
            
        # Check email uniqueness if email is changing
        if email != user.email:
            existing = UserRepository.get_by_email(email)
            if existing:
                raise ValueError("Email address is already in use by another user.")
                
        user.name = name
        user.email = email
        user.phone = phone
        user.address = address
        
        if new_password:
            if len(new_password) < 6:
                raise ValueError("New password must be at least 6 characters long.")
            user.set_password(new_password)
            
        return UserRepository.save(user)

    @staticmethod
    def update_user_privacy(user_id, two_factor_enabled, marketing_consent, analytics_consent):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")
            
        user.two_factor_enabled = bool(two_factor_enabled)
        user.marketing_consent = bool(marketing_consent)
        user.analytics_consent = bool(analytics_consent)
        
        return UserRepository.save(user)

    @staticmethod
    def delete_user_account(user_id, current_password):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")
            
        if not user.check_password(current_password):
            raise ValueError("Incorrect password confirmation.")
            
        UserRepository.delete(user)
        return True
