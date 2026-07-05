from backend.repository.product_repository import ProductRepository
from backend.entity.product import Product

class ProductService:
    @staticmethod
    def add_product(name, category, brand, price, rating, description, stock):
        if not name or not category or not brand or price is None or rating is None:
            raise ValueError("Required fields (name, category, brand, price, rating) are missing.")
        
        product = Product(
            name=name,
            category=category,
            brand=brand,
            price=float(price),
            rating=float(rating),
            description=description,
            stock=int(stock)
        )
        return ProductRepository.save(product)

    @staticmethod
    def update_product(product_id, data):
        product = ProductRepository.get_by_id(product_id)
        if not product:
            raise ValueError("Product not found.")
            
        if 'name' in data:
            product.name = data['name']
        if 'category' in data:
            product.category = data['category']
        if 'brand' in data:
            product.brand = data['brand']
        if 'price' in data:
            product.price = float(data['price'])
        if 'rating' in data:
            product.rating = float(data['rating'])
        if 'description' in data:
            product.description = data['description']
        if 'stock' in data:
            product.stock = int(data['stock'])
            
        return ProductRepository.save(product)

    @staticmethod
    def delete_product(product_id):
        product = ProductRepository.get_by_id(product_id)
        if not product:
            raise ValueError("Product not found.")
        ProductRepository.delete(product)
        return True

    @staticmethod
    def get_product(product_id):
        return ProductRepository.get_by_id(product_id)

    @staticmethod
    def search_products(query=None, category=None, brand=None, max_price=None):
        return ProductRepository.search(query, category, brand, max_price)

    @staticmethod
    def get_comparison(product_ids):
        if not product_ids or not isinstance(product_ids, list):
            raise ValueError("Invalid product IDs list.")
        
        comparison = []
        for pid in product_ids:
            p = ProductRepository.get_by_id(pid)
            if p:
                comparison.append(p.to_dict())
        return comparison
