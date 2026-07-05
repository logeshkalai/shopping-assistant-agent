import re
from backend.service.recommendation_service import RecommendationService
from backend.repository.product_repository import ProductRepository

class ChatbotService:
    CATEGORIES = {
        'laptop': ['laptop', 'notebook', 'ultrabook', 'chromebook', 'macbook', 'computer'],
        'phone': ['phone', 'mobile', 'smartphone', 'iphone', 'cellphone'],
        'headphone': ['headphone', 'earphone', 'headset', 'earbud', 'pods'],
        'keyboard': ['keyboard', 'keypad'],
        'mouse': ['mouse', 'trackpad'],
        'monitor': ['monitor', 'screen', 'display'],
        'sports': ['bat', 'ball', 'sports', 'cricket', 'basketball', 'football', 'play'],
        'food': ['food', 'organic', 'cocoa', 'snack', 'grocery', 'eat', 'chocolate'],
        'appliance': ['appliance', 'vacuum', 'fryer', 'fridge', 'refrigerator', 'cooker', 'microwave', 'oven']
    }

    @staticmethod
    def process_message(message, user_id=None):
        if not message:
            return {
                'response': "Hi! I am your AI Shopping Assistant. How can I help you today? You can ask me to search, compare, or recommend products! For example: 'Suggest a laptop under 50,000 for coding'",
                'products': []
            }

        msg_lower = message.lower()

        # Check for Wishlist intent
        if 'wishlist' in msg_lower or 'my saved' in msg_lower:
            if not user_id:
                return {
                    'response': "Please log in to view your saved wishlist items.",
                    'products': []
                }
            from backend.repository.wishlist_repository import WishlistRepository
            items = WishlistRepository.get_by_user(user_id)
            if not items:
                return {
                    'response': "Your wishlist is currently empty. You can save products by clicking the heart button on the dashboard!",
                    'products': []
                }
            resp = "Here are the products in your wishlist:\n"
            products = []
            for i, item in enumerate(items, 1):
                p = item.product
                if p:
                    resp += f"{i}. **{p.name}** ({p.brand}) - ₹{p.price:,.2f} (Rating: {p.rating} ★)\n"
                    products.append(p.to_dict())
            return {
                'response': resp,
                'products': products
            }

        # Check for Orders intent
        if 'order' in msg_lower or 'purchase' in msg_lower or 'bought' in msg_lower:
            if not user_id:
                return {
                    'response': "Please log in to view your order and purchase history.",
                    'products': []
                }
            from backend.repository.order_repository import OrderRepository
            orders = OrderRepository.get_by_user(user_id)
            if not orders:
                return {
                    'response': "You haven't purchased any products yet. Go to the dashboard and click 'Buy Now' to make a purchase!",
                    'products': []
                }
            resp = "Here is your purchase order history:\n"
            products = []
            for i, order in enumerate(orders, 1):
                p = order.product
                p_name = p.name if p else "Unknown Product"
                resp += f"{i}. **{p_name}** – ₹{order.amount:,.2f} via {order.payment_method} (Txn: `{order.transaction_id}` on {order.created_at.strftime('%Y-%m-%d')})\n"
                if p:
                    products.append(p.to_dict())
            return {
                'response': resp,
                'products': products
            }

        # 1. Check for Highest Rated Query
        if 'highest rating' in msg_lower or 'highest rated' in msg_lower or 'best rated' in msg_lower:
            # Determine category if any
            category = ChatbotService._detect_category(msg_lower)
            products = ProductRepository.get_all()
            if category:
                products = [p for p in products if p.category.lower() == category.lower()]
            
            # Sort by rating
            products.sort(key=lambda x: x.rating, reverse=True)
            top_products = products[:3]
            
            if not top_products:
                return {
                    'response': f"I couldn't find any products in the '{category}' category to rank.",
                    'products': []
                }
            
            cat_str = f" in the {category} category" if category else ""
            resp = f"Here are the highest-rated products{cat_str}:\n"
            for i, p in enumerate(top_products, 1):
                resp += f"{i}. **{p.name}** ({p.brand}) - ₹{p.price:,.2f} (Rating: {p.rating} ★)\n"
            
            return {
                'response': resp,
                'products': [p.to_dict() for p in top_products]
            }

        # 2. Check for Comparison Intent
        if 'compare' in msg_lower:
            # Try to identify products to compare
            # Look up product names from database that appear in the message
            all_products = ProductRepository.get_all()
            matched_products = []
            for p in all_products:
                # Match full word or name in query
                if p.name.lower() in msg_lower or p.brand.lower() in msg_lower and len(p.brand) > 2:
                    matched_products.append(p)
            
            # De-duplicate
            matched_products = list({p.id: p for p in matched_products}.values())
            
            if len(matched_products) >= 2:
                resp = f"I've prepared a comparison between **{', '.join([p.name for p in matched_products[:3]])}**. You can see their direct specs comparison below."
                return {
                    'response': resp,
                    'products': [p.to_dict() for p in matched_products[:3]],
                    'action': 'compare'
                }
            elif len(matched_products) == 1:
                return {
                    'response': f"I found **{matched_products[0].name}**, but please mention another product to compare it with.",
                    'products': [matched_products[0].to_dict()]
                }

        # 3. Detect Budget, Category, and Keywords for Recommendation
        category = ChatbotService._detect_category(msg_lower)
        budget = ChatbotService._detect_budget(msg_lower)
        
        # Build query keywords from words that are not category/budget indicators
        clean_msg = msg_lower
        if budget:
            # Remove digits/budget numbers to avoid interference
            clean_msg = re.sub(r'\b\d+(?:,\d+)*\b', '', clean_msg)
        
        # Remove common query preambles
        preambles = ['suggest', 'recommend', 'show me', 'find me', 'i want', 'looking for', 'best', 'under', 'below', 'around', 'rs', 'rupees']
        for pr in preambles:
            clean_msg = re.sub(r'\b' + pr + r'\b', '', clean_msg)
            
        keywords = clean_msg.strip()

        # Get recommendations
        recommendations = RecommendationService.get_recommendations(
            category=category,
            budget=budget,
            query=keywords if len(keywords) > 2 else None,
            min_rating=4.0
        )

        if not recommendations:
            # Fallback - search without budget or rating limits
            recommendations = RecommendationService.get_recommendations(
                category=category,
                budget=None,
                query=keywords if len(keywords) > 2 else None,
                min_rating=0.0
            )

        top_recs = recommendations[:3]

        if not top_recs:
            return {
                'response': "I couldn't find any products matching your specific query. Can you please try searching for a different brand, category, or features?",
                'products': []
            }

        # Construct response text
        resp = "Here are the best recommendations I found for you:\n\n"
        for i, rec in enumerate(top_recs, 1):
            p = rec['product']
            reasons_str = " - " + "\n - ".join(rec['reasons'])
            resp += f"{i}. **{p['name']}** – ₹{p['price']:,.2f} ({p['rating']} ★)\n{reasons_str}\n\n"

        return {
            'response': resp,
            'products': [r['product'] for r in top_recs]
        }

    @staticmethod
    def _detect_category(msg):
        for cat, keywords in ChatbotService.CATEGORIES.items():
            for kw in keywords:
                if kw in msg:
                    return cat
        return None

    @staticmethod
    def _detect_budget(msg):
        # Look for numbers near budget keywords
        # Matches: under 50000, under 50,000, ₹20000, 15000, etc.
        # Pattern checks for numbers that are preceded by under, below, Rs., rs, ₹, or just lone numbers over 100
        budget_match = re.search(r'(?:under|below|less than|budget|around|rs\.?|₹)\s*(\d+(?:,\d+)*)', msg)
        if budget_match:
            try:
                num_str = budget_match.group(1).replace(',', '')
                return float(num_str)
            except ValueError:
                pass
        
        # Fallback: look for any number > 100 in the query that could represent a price budget
        numbers = re.findall(r'\b\d+(?:,\d+)*\b', msg)
        for num_str in numbers:
            try:
                val = float(num_str.replace(',', ''))
                if val >= 500:  # Sensible price floor for budget
                    return val
            except ValueError:
                pass
                
        return None
