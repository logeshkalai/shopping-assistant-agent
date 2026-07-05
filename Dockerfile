FROM python:3.10-slim

WORKDIR /app

# Copy requirements file first to leverage Docker caching
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files
COPY . .

# Set default environment variables for unified running
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV APP_HOST=0.0.0.0
ENV APP_PORT=5000
ENV DATABASE_DIR=/app/database_dir

# Create the database directory for persistent volume mapping
RUN mkdir -p /app/database_dir

EXPOSE 5000

CMD ["python", "app.py"]
