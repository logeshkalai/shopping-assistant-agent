from backend.entity import db
from backend.entity.wishlist import Wishlist

class WishlistRepository:
    @staticmethod
    def get_by_user(user_id):
        return Wishlist.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_by_user_and_product(user_id, product_id):
        return Wishlist.query.filter_by(user_id=user_id, product_id=product_id).first()

    @staticmethod
    def save(wishlist_item):
        db.session.add(wishlist_item)
        db.session.commit()
        return wishlist_item

    @staticmethod
    def delete(wishlist_item):
        db.session.delete(wishlist_item)
        db.session.commit()
