from flask import Blueprint, request, jsonify, session
from backend.repository.wishlist_repository import WishlistRepository
from backend.entity.wishlist import Wishlist
from backend.entity.product import Product

wishlist_bp = Blueprint('wishlist_bp', __name__)

@wishlist_bp.route('/api/wishlist', methods=['GET'])
def get_wishlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to view your wishlist.'}), 401
        
    items = WishlistRepository.get_by_user(user_id)
    return jsonify([item.to_dict() for item in items])

@wishlist_bp.route('/api/wishlist', methods=['POST'])
def add_to_wishlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to manage your wishlist.'}), 401
        
    data = request.get_json() or {}
    product_id = data.get('product_id')
    if not product_id:
        return jsonify({'success': False, 'message': 'Product ID is required.'}), 400
        
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'success': False, 'message': 'Product not found.'}), 404

    # Check if already in wishlist
    existing = WishlistRepository.get_by_user_and_product(user_id, product_id)
    if existing:
        return jsonify({'success': True, 'message': 'Product already in wishlist.', 'wishlist': existing.to_dict()})

    item = Wishlist(user_id=user_id, product_id=product_id)
    saved = WishlistRepository.save(item)
    return jsonify({'success': True, 'message': 'Added to wishlist!', 'wishlist': saved.to_dict()}), 201

@wishlist_bp.route('/api/wishlist/<int:product_id>', methods=['DELETE'])
def remove_from_wishlist(product_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to manage your wishlist.'}), 401
        
    existing = WishlistRepository.get_by_user_and_product(user_id, product_id)
    if not existing:
        return jsonify({'success': False, 'message': 'Item not found in wishlist.'}), 404
        
    WishlistRepository.delete(existing)
    return jsonify({'success': True, 'message': 'Removed from wishlist!'})

