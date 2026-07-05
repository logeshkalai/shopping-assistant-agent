from flask import Blueprint, request, jsonify, session
from backend.service.product_service import ProductService

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/api/products', methods=['GET'])
def list_products():
    query = request.args.get('query')
    category = request.args.get('category')
    brand = request.args.get('brand')
    
    max_price = request.args.get('max_price')
    if max_price:
        try:
            max_price = float(max_price)
        except ValueError:
            max_price = None

    products = ProductService.search_products(query, category, brand, max_price)
    return jsonify([p.to_dict() for p in products])

@product_bp.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = ProductService.get_product(product_id)
    if not product:
        return jsonify({'success': False, 'message': 'Product not found.'}), 404
    return jsonify(product.to_dict())

@product_bp.route('/api/products', methods=['POST'])
def add_product():
    if not session.get('is_admin'):
        return jsonify({'success': False, 'message': 'Access denied. Administrator privileges required.'}), 403
    data = request.get_json() or {}
    try:
        product = ProductService.add_product(
            name=data.get('name'),
            category=data.get('category'),
            brand=data.get('brand'),
            price=data.get('price'),
            rating=data.get('rating', 0.0),
            description=data.get('description'),
            stock=data.get('stock', 0)
        )
        return jsonify({'success': True, 'product': product.to_dict()}), 201
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@product_bp.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    if not session.get('is_admin'):
        return jsonify({'success': False, 'message': 'Access denied. Administrator privileges required.'}), 403
    data = request.get_json() or {}
    try:
        product = ProductService.update_product(product_id, data)
        return jsonify({'success': True, 'product': product.to_dict()})
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@product_bp.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    if not session.get('is_admin'):
        return jsonify({'success': False, 'message': 'Access denied. Administrator privileges required.'}), 403
    try:
        ProductService.delete_product(product_id)
        return jsonify({'success': True, 'message': 'Product deleted successfully.'})
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@product_bp.route('/api/products/compare', methods=['POST'])
def compare_products():
    data = request.get_json() or {}
    product_ids = data.get('product_ids', [])
    try:
        comparison_data = ProductService.get_comparison(product_ids)
        return jsonify(comparison_data)
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400
