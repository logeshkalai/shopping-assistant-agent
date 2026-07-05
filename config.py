import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-shopping-agent-key'
    
    # Support custom DB URL or local DB directory path (useful for docker volumes)
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        db_dir = os.environ.get('DATABASE_DIR') or os.path.abspath(os.path.dirname(__file__))
        db_url = 'sqlite:///' + os.path.join(db_dir, 'database.db')
        
    SQLALCHEMY_DATABASE_URI = db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False

