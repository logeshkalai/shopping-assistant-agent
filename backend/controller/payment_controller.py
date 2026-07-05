import uuid
from flask import Blueprint, request, jsonify, session
from backend.entity.product import Product
from backend.entity.order import Order
from backend.repository.order_repository import OrderRepository
from backend.entity import db

payment_bp = Blueprint('payment_bp', __name__)

@payment_bp.route('/api/payment/checkout', methods=['POST'])
def checkout():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to make a purchase.'}), 401
        
    data = request.get_json() or {}
    product_id = data.get('product_id')
    payment_method = data.get('payment_method')

    if not product_id or not payment_method:
        return jsonify({'success': False, 'message': 'Product ID and payment method are required.'}), 400

    # Fetch product and verify stock
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'success': False, 'message': 'Product not found.'}), 404

    if product.stock <= 0:
        return jsonify({'success': False, 'message': f'Sorry, {product.name} is currently out of stock.'}), 400

    try:
        # Deduct stock
        product.stock -= 1
        
        # Generate unique transaction ID
        transaction_id = "TXN-" + str(uuid.uuid4().hex[:12]).upper()

        # Create Order
        order = Order(
            user_id=user_id,
            product_id=product_id,
            amount=product.price,
            payment_method=payment_method,
            status='COMPLETED',
            transaction_id=transaction_id
        )

        OrderRepository.save(order)
        
        return jsonify({
            'success': True,
            'message': 'Payment successful! Thank you for your purchase.',
            'order': order.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Transaction failed: {str(e)}'}), 500

@payment_bp.route('/api/payment/orders', methods=['GET'])
def get_orders():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to view order history.'}), 401
        
    orders = OrderRepository.get_by_user(user_id)
    return jsonify([order.to_dict() for order in orders])
