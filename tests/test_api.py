import unittest
import json
import os
from app import create_app, db
from backend.entity.product import Product
from backend.entity.user import User

class ShoppingAgentAPITestCase(unittest.TestCase):
    def setUp(self):
        # Override configuration for testing
        self.db_path = os.path.abspath('test_database.db')
        self.app = create_app(testing=True)
        self.app.config['SECRET_KEY'] = 'test-secret'
        
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            
            # Add some baseline testing products
            p1 = Product(
                name="Test Laptop Alpha",
                category="laptop",
                brand="TestBrand",
                price=30000.00,
                rating=4.5,
                description="Great for programming and coding.",
                stock=5
            )
            p2 = Product(
                name="Test Phone Beta",
                category="phone",
                brand="OtherBrand",
                price=15000.00,
                rating=3.8,
                description="Budget phone with nice battery.",
                stock=10
            )
            db.session.add(p1)
            db.session.add(p2)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            db.engine.dispose()
        if os.path.exists(self.db_path):
            try:
                os.remove(self.db_path)
            except PermissionError:
                pass
        # Clean up database.db if it got created by default context during setup
        default_db = os.path.abspath('database.db')
        # We don't delete default database.db since it's used for main app running,
        # but if we generated a test file we delete that.

    def test_user_registration_and_login(self):
        # Test Registration
        reg_payload = {
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        }
        res = self.client.post('/api/auth/register', 
                               data=json.dumps(reg_payload), 
                               content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        
        # Test Login
        login_payload = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        res = self.client.post('/api/auth/login', 
                               data=json.dumps(login_payload), 
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])

    def test_product_search(self):
        res = self.client.get('/api/products?category=laptop')
        self.assertEqual(res.status_code, 200)
        products = json.loads(res.data.decode('utf-8'))
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0]['name'], "Test Laptop Alpha")

    def test_recommendation_filtering(self):
        res = self.client.get('/api/recommendations?budget=20000')
        self.assertEqual(res.status_code, 200)
        recommendations = json.loads(res.data.decode('utf-8'))
        
        # Phone Beta (15000) fits in budget. Laptop Alpha (30000) does not.
        self.assertEqual(len(recommendations), 1)
        self.assertEqual(recommendations[0]['product']['name'], "Test Phone Beta")

    def test_chatbot_parsing(self):
        # Chatbot: "suggest laptop under 40000"
        payload = {
            'message': 'suggest a laptop under 40000 for coding'
        }
        res = self.client.post('/api/chatbot',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        
        # Should return Test Laptop Alpha (price 30000, category laptop)
        self.assertTrue(len(data['products']) >= 1)
        self.assertEqual(data['products'][0]['name'], "Test Laptop Alpha")
        self.assertIn("Test Laptop Alpha", data['response'])

        # Register and log in user
        user_payload = {
            'name': 'Chat User',
            'email': 'chatuser@example.com',
            'password': 'password123',
            'is_admin': False
        }
        self.client.post('/api/auth/register',
                          data=json.dumps(user_payload),
                          content_type='application/json')

        # Add item (id=2, Test Phone Beta) to wishlist
        wish_payload = { 'product_id': 2 }
        self.client.post('/api/wishlist',
                         data=json.dumps(wish_payload),
                         content_type='application/json')

        # Send "show my wishlist" to chatbot
        chat_payload = { 'message': 'show my wishlist' }
        res = self.client.post('/api/chatbot',
                               data=json.dumps(chat_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(len(data['products']) >= 1)
        self.assertEqual(data['products'][0]['name'], 'Test Phone Beta')
        self.assertIn("Test Phone Beta", data['response'])

        # Checkout item (id=2, Test Phone Beta)
        pay_payload = { 'product_id': 2, 'payment_method': 'Credit Card' }
        self.client.post('/api/payment/checkout',
                         data=json.dumps(pay_payload),
                         content_type='application/json')

        # Send "show my orders" to chatbot
        chat_payload = { 'message': 'what have I bought?' }
        res = self.client.post('/api/chatbot',
                               data=json.dumps(chat_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(len(data['products']) >= 1)
        self.assertEqual(data['products'][0]['name'], 'Test Phone Beta')
        self.assertIn("Test Phone Beta", data['response'])
        self.assertIn("Credit Card", data['response'])

    def test_role_based_product_crud(self):
        # 1. Try to add product without admin log-in (should return 403)
        prod_payload = {
            'name': 'Unauthorized Keyboard',
            'category': 'keyboard',
            'brand': 'NoBrand',
            'price': 1500,
            'rating': 4.0,
            'stock': 5
        }
        res = self.client.post('/api/products', 
                               data=json.dumps(prod_payload), 
                               content_type='application/json')
        self.assertEqual(res.status_code, 403)

        # 2. Register and log in as normal user
        user_payload = {
            'name': 'Normal User',
            'email': 'user@example.com',
            'password': 'password123',
            'is_admin': False
        }
        self.client.post('/api/auth/register', 
                          data=json.dumps(user_payload), 
                          content_type='application/json')
        
        # Try to add product as normal user (should return 403)
        res = self.client.post('/api/products', 
                               data=json.dumps(prod_payload), 
                               content_type='application/json')
        self.assertEqual(res.status_code, 403)

        # Logout user
        self.client.post('/api/auth/logout')

        # 3. Register and log in as admin
        admin_payload = {
            'name': 'Admin User',
            'email': 'admin@example.com',
            'password': 'password123',
            'is_admin': True
        }
        self.client.post('/api/auth/register', 
                          data=json.dumps(admin_payload), 
                          content_type='application/json')
        
        # Try to add product as admin (should return 201)
        res = self.client.post('/api/products', 
                               data=json.dumps(prod_payload), 
                               content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        self.assertEqual(data['product']['name'], 'Unauthorized Keyboard')

    def test_checkout_and_orders(self):
        # 1. Try to checkout without log-in (should return 401)
        payload = {
            'product_id': 2, # Phone Beta (id=2 in setup)
            'payment_method': 'UPI'
        }
        res = self.client.post('/api/payment/checkout',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 401)

        # 2. Register and log in a user
        user_payload = {
            'name': 'Buyer User',
            'email': 'buyer@example.com',
            'password': 'password123',
            'is_admin': False
        }
        self.client.post('/api/auth/register',
                          data=json.dumps(user_payload),
                          content_type='application/json')

        # 3. Checkout product as logged-in user (should return 201)
        res = self.client.post('/api/payment/checkout',
                               data=json.dumps(payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        self.assertEqual(data['order']['amount'], 15000.0)
        self.assertTrue(data['order']['transaction_id'].startswith("TXN-"))

        # 4. Fetch orders list
        res = self.client.get('/api/payment/orders')
        self.assertEqual(res.status_code, 200)
        orders = json.loads(res.data.decode('utf-8'))
        self.assertEqual(len(orders), 1)
        self.assertEqual(orders[0]['product_name'], 'Test Phone Beta')

    def test_profile_update(self):
        # 1. Register and log in a user
        reg_payload = {
            'name': 'Original Name',
            'email': 'original@example.com',
            'password': 'password123',
            'is_admin': False
        }
        self.client.post('/api/auth/register',
                          data=json.dumps(reg_payload),
                          content_type='application/json')

        # 2. Try to update profile with wrong current password (should return 400)
        update_payload = {
            'name': 'New Name',
            'email': 'new@example.com',
            'phone': '1234567890',
            'address': '123 Main St, Springfield',
            'current_password': 'wrongpassword',
            'new_password': 'newpassword123'
        }
        res = self.client.post('/api/auth/profile/update',
                               data=json.dumps(update_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 400)
        data = json.loads(res.data.decode('utf-8'))
        self.assertFalse(data['success'])
        self.assertEqual(data['message'], 'Incorrect current password.')

        # 3. Update profile with correct password (should return 200)
        update_payload['current_password'] = 'password123'
        res = self.client.post('/api/auth/profile/update',
                               data=json.dumps(update_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        self.assertEqual(data['user']['name'], 'New Name')
        self.assertEqual(data['user']['email'], 'new@example.com')
        self.assertEqual(data['user']['phone'], '1234567890')
        self.assertEqual(data['user']['address'], '123 Main St, Springfield')

        # 4. Check if we can log in with new password
        self.client.post('/api/auth/logout')
        login_payload = {
            'email': 'new@example.com',
            'password': 'newpassword123'
        }
        res = self.client.post('/api/auth/login',
                               data=json.dumps(login_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])

    def test_profile_security_and_privacy(self):
        # 1. Register and log in a user
        reg_payload = {
            'name': 'Privacy User',
            'email': 'privacy@example.com',
            'password': 'password123',
            'is_admin': False
        }
        self.client.post('/api/auth/register',
                          data=json.dumps(reg_payload),
                          content_type='application/json')

        # 2. Test GET privacy default settings
        res = self.client.get('/api/auth/profile/privacy')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        self.assertFalse(data['privacy']['two_factor_enabled'])
        self.assertTrue(data['privacy']['marketing_consent'])
        self.assertTrue(data['privacy']['analytics_consent'])

        # Assert personalization is active when consent is True
        res = self.client.get('/api/recommendations?query=Phone+Beta')
        self.assertEqual(res.status_code, 200)
        recs = json.loads(res.data.decode('utf-8'))
        self.assertEqual(recs[0]['product']['name'], 'Test Phone Beta')

        # 3. Test POST privacy settings update
        update_privacy_payload = {
            'two_factor_enabled': True,
            'marketing_consent': False,
            'analytics_consent': False
        }
        res = self.client.post('/api/auth/profile/privacy',
                               data=json.dumps(update_privacy_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])
        self.assertTrue(data['privacy']['two_factor_enabled'])
        self.assertFalse(data['privacy']['marketing_consent'])
        self.assertFalse(data['privacy']['analytics_consent'])

        # Assert personalization is ignored when consent is False
        res = self.client.get('/api/recommendations?query=Phone+Beta')
        self.assertEqual(res.status_code, 200)
        recs = json.loads(res.data.decode('utf-8'))
        self.assertEqual(recs[0]['product']['name'], 'Test Laptop Alpha')

        # 4. Test GET export profile user data
        res = self.client.get('/api/auth/profile/export')
        self.assertEqual(res.status_code, 200)
        self.assertIn('attachment; filename=user_data_export_', res.headers.get('Content-Disposition', ''))
        data = json.loads(res.data.decode('utf-8'))
        self.assertEqual(data['user']['email'], 'privacy@example.com')
        self.assertTrue(data['user']['two_factor_enabled'])
        self.assertFalse(data['user']['marketing_consent'])
        self.assertIn('orders', data)
        self.assertIn('wishlist', data)

        # 5. Test POST account delete check password mismatch
        delete_payload = {'current_password': 'wrongpassword'}
        res = self.client.post('/api/auth/profile/delete',
                               data=json.dumps(delete_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 400)
        data = json.loads(res.data.decode('utf-8'))
        self.assertFalse(data['success'])

        # 6. Test POST account delete success
        delete_payload['current_password'] = 'password123'
        res = self.client.post('/api/auth/profile/delete',
                               data=json.dumps(delete_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['success'])

        # 7. Check that login fails after deletion
        login_payload = {
            'email': 'privacy@example.com',
            'password': 'password123'
        }
        res = self.client.post('/api/auth/login',
                               data=json.dumps(login_payload),
                               content_type='application/json')
        self.assertEqual(res.status_code, 401)

if __name__ == '__main__':
    unittest.main()
