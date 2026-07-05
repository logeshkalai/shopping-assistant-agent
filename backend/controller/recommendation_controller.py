from flask import Blueprint, request, jsonify, session
from backend.service.recommendation_service import RecommendationService
from backend.service.chatbot_service import ChatbotService

recommendation_bp = Blueprint('recommendation_bp', __name__)

@recommendation_bp.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    category = request.args.get('category')
    query = request.args.get('query')
    
    budget = request.args.get('budget')
    if budget:
        try:
            budget = float(budget)
        except ValueError:
            budget = None

    min_rating = request.args.get('min_rating', 4.0)
    try:
        min_rating = float(min_rating)
    except ValueError:
        min_rating = 4.0

    # Privacy Compliance check: Check if user has opted out of recommendation personalization
    user_id = session.get('user_id')
    if user_id:
        from backend.service.user_service import UserService
        try:
            user = UserService.get_user_profile(user_id)
            if not user.marketing_consent:
                query = None # Clear query to suspend personalization matches
        except Exception:
            pass

    results = RecommendationService.get_recommendations(category, budget, query, min_rating)
    return jsonify(results)

@recommendation_bp.route('/api/chatbot', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message')
    user_id = session.get('user_id')

    result = ChatbotService.process_message(message, user_id)
    return jsonify(result)
