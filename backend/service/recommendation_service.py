import re
from backend.repository.product_repository import ProductRepository

class RecommendationService:
    @staticmethod
    def get_recommendations(category=None, budget=None, query=None, min_rating=4.0):
        # 1. Fetch products
        # We start with all products, or filter by category if provided
        products = ProductRepository.get_all()
        
        scored_products = []
        
        # Clean query tokens
        query_words = []
        if query:
            # Tokenize and lowercase
            query_words = [w.lower() for w in re.findall(r'\w+', query) if len(w) > 2]
            
        for p in products:
            # Filter 1: Budget constraint
            if budget is not None and p.price > budget:
                continue
                
            # Filter 2: Category constraint (if specified)
            if category and p.category.lower() != category.lower():
                continue
                
            # Calculate match scores
            keyword_matches = 0
            if query_words:
                p_name_lower = p.name.lower()
                p_desc_lower = p.description.lower() if p.description else ""
                p_brand_lower = p.brand.lower()
                p_cat_lower = p.category.lower()
                
                # Check match frequency
                for word in query_words:
                    if word in p_name_lower:
                        keyword_matches += 3.0  # Weight name matches heavily
                    if word in p_desc_lower:
                        keyword_matches += 1.0  # Weight description matches normally
                    if word in p_brand_lower:
                        keyword_matches += 2.0  # Weight brand matches
                    if word in p_cat_lower:
                        keyword_matches += 2.0  # Weight category matches

            # Base score calculation
            # High ratings are strongly preferred: rating is usually 0.0 - 5.0
            rating_score = p.rating * 2.0
            
            # Price efficiency score: prefer items that fit budget but offer good value
            price_score = 0.0
            if budget is not None and budget > 0:
                # If budget is 20000, and price is 19000, ratio is 0.95.
                # A product closer to the budget might be of higher quality, but we also want a budget-saving score.
                # Let's reward products that are within the budget, and slightly penalize if they are extremely cheap (which might indicate low tier)
                # or reward them if they leave some pocket money.
                # Let's say: score = (1.0 - (price/budget)) * 2.0 (representing savings) + (price/budget) * 1.0 (representing spec tier)
                savings_ratio = (budget - p.price) / budget
                price_score = savings_ratio * 3.0 + (1.0 - savings_ratio) * 1.5
            
            total_score = rating_score + keyword_matches + price_score
            
            # Apply min_rating heuristic from example logic
            # "if (price <= budget && rating > 4) { recommend(); }"
            # Let's boost products with rating >= min_rating
            is_highly_rated = p.rating >= min_rating
            if is_highly_rated:
                total_score += 5.0
                
            scored_products.append({
                'product': p.to_dict(),
                'score': total_score,
                'reasons': RecommendationService._generate_reasons(p, budget, query_words, is_highly_rated)
            })
            
        # Sort by score descending
        scored_products.sort(key=lambda x: x['score'], reverse=True)
        
        # Return top recommendations
        return scored_products

    @staticmethod
    def _generate_reasons(product, budget, query_words, is_highly_rated):
        reasons = []
        if is_highly_rated:
            reasons.append(f"Highly rated by users ({product.rating} stars).")
        else:
            reasons.append(f"Good solid customer feedback ({product.rating} stars).")
            
        if budget is not None:
            savings = budget - product.price
            if savings > 0:
                reasons.append(f"Fits comfortably in your budget, saving you ₹{savings:,.2f}.")
            else:
                reasons.append("Right at your maximum budget limit.")
                
        # Matching features
        matched_features = []
        for word in query_words:
            if product.description and word in product.description.lower():
                # Try to extract context of match
                matched_features.append(word)
        if matched_features:
            features_str = ", ".join(list(set(matched_features))[:3])
            reasons.append(f"Matches search keywords/features: '{features_str}'.")
            
        if product.stock < 5:
            reasons.append(f"Only {product.stock} left in stock - order soon!")
            
        return reasons
