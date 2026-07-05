import os
import urllib.request
import urllib.error
from flask import Flask, render_template, request, Response

def create_frontend_app():
    app = Flask(__name__, 
                template_folder=os.path.abspath('frontend'),
                static_folder=os.path.abspath('frontend'),
                static_url_path='')
    
    app.secret_key = os.environ.get('SECRET_KEY') or 'frontend_secret_key'
    
    # UI Routes
    @app.route('/')
    @app.route('/dashboard.html')
    def index():
        return render_template('dashboard.html')
        
    @app.route('/login')
    @app.route('/login.html')
    def login_page():
        return render_template('login.html')
        
    @app.route('/register')
    @app.route('/register.html')
    def register_page():
        return render_template('register.html')
        
    @app.route('/products')
    @app.route('/products.html')
    def products_page():
        return render_template('products.html')
        
    @app.route('/chatbot')
    @app.route('/chatbot.html')
    def chatbot_page():
        return render_template('chatbot.html')

    @app.route('/profile')
    @app.route('/profile.html')
    def profile_page():
        return render_template('profile.html')

    @app.route('/payment')
    @app.route('/payment.html')
    def payment_page():
        return render_template('payment.html')

    @app.route('/product-details')
    @app.route('/product-details.html')
    def product_details_page():
        return render_template('product-details.html')

    # API Proxy Handler (Redirects to Backend Data Server on port 5000)
    @app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
    def proxy_api(path):
        backend_url = os.environ.get('BACKEND_URL', 'http://127.0.0.1:5000')
        url = f"{backend_url}/api/{path}"
        if request.query_string:
            url += f"?{request.query_string.decode('utf-8')}"
            
        req_headers = {key: value for key, value in request.headers if key.lower() != 'host'}
        data = request.get_data() if request.method in ['POST', 'PUT', 'DELETE'] else None
        
        req = urllib.request.Request(url, data=data, headers=req_headers, method=request.method)
        
        try:
            with urllib.request.urlopen(req) as response:
                res_content = response.read()
                res_status = response.status
                res_headers = dict(response.info())
        except urllib.error.HTTPError as e:
            res_content = e.read()
            res_status = e.code
            res_headers = dict(e.info())
        except Exception as e:
            return Response(str(e), 500)
            
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for name, value in res_headers.items()
                   if name.lower() not in excluded_headers]
                   
        return Response(res_content, res_status, headers)

    return app

if __name__ == '__main__':
    app = create_frontend_app()
    host = os.environ.get('FRONTEND_HOST', '127.0.0.1')
    port = int(os.environ.get('FRONTEND_PORT', 3000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'True').lower() in ['true', '1']
    
    # Avoid reloader signal crash when run inside non-main threads
    import threading
    is_main_thread = threading.current_thread() is threading.main_thread()
    
    print(f"Frontend UI Assets Web Server running on http://{host}:{port}...")
    app.run(host=host, port=port, debug=debug_mode, use_reloader=(debug_mode and is_main_thread))

