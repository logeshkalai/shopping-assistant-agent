# 🛒 AI Shopping Assistant Agent

A full-stack intelligent shopping assistant web application built with **Flask**, featuring AI-powered product recommendations, a chatbot, wishlist management, payment processing, and user authentication.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0.3-black?logo=flask)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightblue?logo=sqlite)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🔐 **User Authentication** — Register, Login, Profile management
- 🛍️ **Product Catalog** — Browse products with detailed product pages
- 🤖 **AI Chatbot** — Intelligent shopping assistant powered by an NLP chatbot
- 🎯 **Smart Recommendations** — Personalized product recommendations
- ❤️ **Wishlist** — Save and manage favourite products
- 💳 **Payment Processing** — Secure checkout and payment flow
- 📦 **Order Management** — Track and manage orders
- 🐳 **Docker Support** — Fully containerized with Docker & Docker Compose

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.11, Flask 3.0.3 |
| **Database** | SQLite (via Flask-SQLAlchemy) |
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap 5 |
| **Server** | Gunicorn |
| **Container** | Docker, Docker Compose |
| **Deployment** | Render |

---

## 📁 Project Structure

```
Shopping Assistant Agent/
├── app.py                  # Main Flask application factory
├── app_api.py              # API entry point
├── app_frontend.py         # Frontend entry point
├── config.py               # App configuration (env-based)
├── requirements.txt        # Python dependencies
├── render.yaml             # Render deployment config
├── docker-compose.yml      # Docker Compose setup
├── Dockerfile              # Main Dockerfile
├── Dockerfile.backend      # Backend Dockerfile
├── Dockerfile.frontend     # Frontend Dockerfile
├── run.bat                 # Windows run script
│
├── backend/
│   ├── controller/         # Route handlers (blueprints)
│   │   ├── user_controller.py
│   │   ├── product_controller.py
│   │   ├── recommendation_controller.py
│   │   ├── wishlist_controller.py
│   │   └── payment_controller.py
│   ├── service/            # Business logic layer
│   │   ├── user_service.py
│   │   ├── product_service.py
│   │   ├── chatbot_service.py
│   │   └── recommendation_service.py
│   ├── repository/         # Database access layer
│   │   ├── user_repository.py
│   │   ├── product_repository.py
│   │   ├── order_repository.py
│   │   └── wishlist_repository.py
│   └── entity/             # SQLAlchemy models
│       ├── user.py
│       ├── product.py
│       ├── order.py
│       ├── wishlist.py
│       ├── address.py
│       └── card.py
│
├── frontend/               # HTML/CSS/JS frontend
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── product-details.html
│   ├── chatbot.html
│   ├── profile.html
│   ├── payment.html
│   ├── main.js
│   └── style.css
│
├── database/
│   └── shopping.sql        # SQL schema
│
└── tests/
    └── test_api.py         # API tests
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- pip

### 1. Clone the Repository

```bash
git clone https://github.com/logeshkalai/shopping-assistant-agent.git
cd shopping-assistant-agent
```

### 2. Create Virtual Environment

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///database.db
```

### 5. Run the Application

```bash
# Windows
run.bat

# Or directly
python app.py
```

Visit: **http://127.0.0.1:5000**

---

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

---

## ☁️ Deploy on Render

1. Fork/clone this repo to your GitHub
2. Go to [https://render.com](https://render.com) and sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select this repository
5. Configure:

| Setting | Value |
|---------|-------|
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn "app:create_app()"` |

6. Add Environment Variables:
   - `SECRET_KEY` → Generate a random value
   - `PYTHON_VERSION` → `3.11.0`

7. Click **"Create Web Service"** 🚀

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/login` | User login |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/<id>` | Get product details |
| `GET` | `/api/recommendations` | Get AI recommendations |
| `GET/POST` | `/api/wishlist` | Manage wishlist |
| `POST` | `/api/payment` | Process payment |
| `GET` | `/api/orders` | Get user orders |
| `POST` | `/api/chatbot` | Chat with AI assistant |

---

## 🧪 Running Tests

```bash
python -m pytest tests/
```

---

## 📸 Pages

| Page | Route |
|------|-------|
| Dashboard | `/` |
| Login | `/login` |
| Register | `/register` |
| Products | `/products` |
| Product Details | `/product-details` |
| Chatbot | `/chatbot` |
| Profile | `/profile` |
| Payment | `/payment` |

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Logesh Kalai**  
GitHub: [@logeshkalai](https://github.com/logeshkalai)
