from database import SessionLocal
from models import Product


PRODUCTS = [
    {
        "name": "Laptop",
        "description": "High-performance laptop for work and development",
        "price": 75000,
        "stock_quantity": 8,
    },
    {
        "name": "Mechanical Keyboard",
        "description": "Mechanical keyboard for productivity and gaming",
        "price": 5000,
        "stock_quantity": 25,
    },
    {
        "name": "Monitor",
        "description": "Full HD monitor for work and entertainment",
        "price": 20000,
        "stock_quantity": 15,
    },
]


def seed_products():
    db = SessionLocal()

    try:
        for product_data in PRODUCTS:
            existing_product = (
                db.query(Product)
                .filter(Product.name == product_data["name"])
                .first()
            )

            if existing_product:
                print(f"Already exists: {product_data['name']}")
                continue

            product = Product(**product_data)
            db.add(product)
            print(f"Created: {product_data['name']}")

        db.commit()
        print("Product seeding completed successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_products()
