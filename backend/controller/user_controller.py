from flask import Blueprint, request, jsonify, session
from backend.service.user_service import UserService

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    is_admin = data.get('is_admin', False)

    try:
        user = UserService.register_user(name, email, password, is_admin)
        # Auto-login upon registration
        session['user_id'] = user.id
        session['user_name'] = user.name
        session['is_admin'] = user.is_admin
        return jsonify({
            'success': True,
            'message': 'Registration successful!',
            'user': user.to_dict()
        }), 201
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    try:
        user = UserService.authenticate_user(email, password)
        if not user:
            return jsonify({'success': False, 'message': 'Invalid email or password.'}), 401
            
        session['user_id'] = user.id
        session['user_name'] = user.name
        session['is_admin'] = user.is_admin
        return jsonify({
            'success': True,
            'message': 'Login successful!',
            'user': user.to_dict()
        }), 200
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    session.pop('is_admin', None)
    return jsonify({'success': True, 'message': 'Logged out successfully.'})

@user_bp.route('/api/auth/profile', methods=['GET'])
def get_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    try:
        user = UserService.get_user_profile(user_id)
        return jsonify({'success': True, 'user': user.to_dict()})
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 404

@user_bp.route('/api/auth/profile/update', methods=['POST'])
def update_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Please log in to update your profile.'}), 401
        
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    
    if not name or not email or not current_password:
        return jsonify({'success': False, 'message': 'Name, email, and current password are required.'}), 400
        
    try:
        updated_user = UserService.update_user_profile(user_id, name, email, phone, address, current_password, new_password)
        # Update session name
        session['user_name'] = updated_user.name
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully!',
            'user': updated_user.to_dict()
        })
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/profile/privacy', methods=['GET'])
def get_privacy():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    try:
        user = UserService.get_user_profile(user_id)
        return jsonify({
            'success': True,
            'privacy': {
                'two_factor_enabled': user.two_factor_enabled,
                'marketing_consent': user.marketing_consent,
                'analytics_consent': user.analytics_consent
            }
        })
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 404

@user_bp.route('/api/auth/profile/privacy', methods=['POST'])
def update_privacy():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    data = request.get_json() or {}
    two_factor_enabled = data.get('two_factor_enabled', False)
    marketing_consent = data.get('marketing_consent', True)
    analytics_consent = data.get('analytics_consent', True)
    
    try:
        updated_user = UserService.update_user_privacy(user_id, two_factor_enabled, marketing_consent, analytics_consent)
        return jsonify({
            'success': True,
            'message': 'Privacy settings updated successfully!',
            'privacy': {
                'two_factor_enabled': updated_user.two_factor_enabled,
                'marketing_consent': updated_user.marketing_consent,
                'analytics_consent': updated_user.analytics_consent
            }
        })
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/profile/export', methods=['GET'])
def export_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    try:
        user = UserService.get_user_profile(user_id)
        
        user_data = user.to_dict()
        orders_data = [o.to_dict() for o in user.orders]
        wishlist_data = [w.to_dict() for w in user.wishlist_items]
        
        from datetime import datetime
        export_payload = {
            'exported_at': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'),
            'user': user_data,
            'orders': orders_data,
            'wishlist': wishlist_data
        }
        
        response = jsonify(export_payload)
        response.headers['Content-Disposition'] = f'attachment; filename=user_data_export_{user_id}.json'
        return response
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 404

@user_bp.route('/api/auth/profile/delete', methods=['POST'])
def delete_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    data = request.get_json() or {}
    current_password = data.get('current_password')
    
    if not current_password:
        return jsonify({'success': False, 'message': 'Current password is required to verify identity.'}), 400
        
    try:
        UserService.delete_user_account(user_id, current_password)
        session.pop('user_id', None)
        session.pop('user_name', None)
        session.pop('is_admin', None)
        
        return jsonify({
            'success': True,
            'message': 'Your account and data have been permanently deleted.'
        })
    except ValueError as e:
        return jsonify({'success': False, 'message': str(e)}), 400

# --- Shipping Address Manager ---
@user_bp.route('/api/auth/profile/addresses', methods=['GET'])
def get_addresses():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
    
    from backend.entity.address import UserAddress
    addresses = UserAddress.query.filter_by(user_id=user_id).all()
    return jsonify({'success': True, 'addresses': [a.to_dict() for a in addresses]})

@user_bp.route('/api/auth/profile/addresses', methods=['POST'])
def add_address():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    data = request.get_json() or {}
    label = data.get('label')
    recipient_name = data.get('recipient_name')
    phone = data.get('phone')
    address_text = data.get('address_text')
    
    if not label or not recipient_name or not phone or not address_text:
        return jsonify({'success': False, 'message': 'All address fields are required.'}), 400
        
    from backend.entity import db
    from backend.entity.address import UserAddress
    try:
        addr = UserAddress(user_id=user_id, label=label, recipient_name=recipient_name, phone=phone, address_text=address_text)
        db.session.add(addr)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Address added successfully!', 'address': addr.to_dict()})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/profile/addresses/<int:addr_id>', methods=['DELETE'])
def delete_address(addr_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    from backend.entity import db
    from backend.entity.address import UserAddress
    addr = UserAddress.query.filter_by(id=addr_id, user_id=user_id).first()
    if not addr:
        return jsonify({'success': False, 'message': 'Address not found.'}), 404
        
    try:
        db.session.delete(addr)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Address deleted successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


# --- Saved Payment Card Manager ---
@user_bp.route('/api/auth/profile/cards', methods=['GET'])
def get_cards():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    from backend.entity.card import SavedCard
    cards = SavedCard.query.filter_by(user_id=user_id).all()
    return jsonify({'success': True, 'cards': [c.to_dict() for c in cards]})

@user_bp.route('/api/auth/profile/cards', methods=['POST'])
def add_card():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    data = request.get_json() or {}
    cardholder_name = data.get('cardholder_name')
    card_number = data.get('card_number')
    expiry = data.get('expiry')
    
    if not cardholder_name or not card_number or not expiry:
        return jsonify({'success': False, 'message': 'Cardholder name, card number, and expiry are required.'}), 400
        
    # Clean card number (remove spaces)
    clean_num = ''.join(card_number.split())
    if len(clean_num) < 13 or len(clean_num) > 19:
        return jsonify({'success': False, 'message': 'Invalid card number length.'}), 400
        
    # Determine brand
    brand = 'Visa'
    if clean_num.startswith('5'):
        brand = 'Mastercard'
    elif clean_num.startswith('3'):
        brand = 'American Express'
    elif clean_num.startswith('6'):
        brand = 'Discover'
        
    # Mask card number (keep last 4 digits)
    masked = f"•••• •••• •••• {clean_num[-4:]}"
    
    from backend.entity import db
    from backend.entity.card import SavedCard
    try:
        card = SavedCard(user_id=user_id, cardholder_name=cardholder_name, card_number_masked=masked, card_brand=brand, expiry=expiry)
        db.session.add(card)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Card saved successfully!', 'card': card.to_dict()})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@user_bp.route('/api/auth/profile/cards/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    from backend.entity import db
    from backend.entity.card import SavedCard
    card = SavedCard.query.filter_by(id=card_id, user_id=user_id).first()
    if not card:
        return jsonify({'success': False, 'message': 'Card not found.'}), 404
        
    try:
        db.session.delete(card)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Card deleted successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


# --- OTP Mock Phone Verification ---
@user_bp.route('/api/auth/profile/verify-phone', methods=['POST'])
def verify_phone():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    data = request.get_json() or {}
    otp = data.get('otp')
    
    if otp != '1234':
        return jsonify({'success': False, 'message': 'Incorrect verification code. Please try again with OTP 1234.'}), 400
        
    from backend.entity import db
    try:
        user = UserService.get_user_profile(user_id)
        user.phone_verified = True
        db.session.commit()
        return jsonify({'success': True, 'message': 'Phone number verified successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


# --- Security Activity Audit Trail ---
@user_bp.route('/api/auth/profile/security-logs', methods=['GET'])
def get_security_logs():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized.'}), 401
        
    from datetime import datetime, timedelta
    now = datetime.now()
    
    logs = [
        {
            'event': 'Authorized Login Success',
            'timestamp': (now - timedelta(minutes=45)).strftime('%Y-%m-%d %H:%M:%S'),
            'ip': '127.0.0.1 (Current IP)',
            'location': 'Springfield (Detected)',
            'device': 'Chrome Browser 124.0 / Windows OS (Current)'
        },
        {
            'event': 'API Token Handshake',
            'timestamp': (now - timedelta(minutes=44)).strftime('%Y-%m-%d %H:%M:%S'),
            'ip': '127.0.0.1 (Current IP)',
            'location': 'Springfield (Detected)',
            'device': 'Chrome Browser 124.0 / Windows OS (Current)'
        },
        {
            'event': 'Profile Verification Check',
            'timestamp': (now - timedelta(days=1, hours=2)).strftime('%Y-%m-%d %H:%M:%S'),
            'ip': '192.168.1.45',
            'location': 'Private Subnet',
            'device': 'Android Mobile App / OnePlus Device'
        },
        {
            'event': 'Authorized Login Success',
            'timestamp': (now - timedelta(days=1, hours=2)).strftime('%Y-%m-%d %H:%M:%S'),
            'ip': '192.168.1.45',
            'location': 'Private Subnet',
            'device': 'Android Mobile App / OnePlus Device'
        }
    ]
    return jsonify({'success': True, 'logs': logs})
