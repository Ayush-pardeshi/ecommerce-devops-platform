from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from auth import create_access_token, get_current_user_id
from database import get_db
from models import CartItem, Order, OrderItem, Product, User
from schemas import CartItemCreate, ProductCreate, UserCreate, UserLogin
from security import hash_password, verify_password


app = FastAPI(title="E-Commerce Platform API")
app.add_middleware(
            CORSMiddleware,
                allow_origins=[
                            "http://127.0.0.1:5173",
                                    "http://localhost:5173",
                                        ],
                    allow_credentials=True,
                        allow_methods=["*"],
                            allow_headers=["*"],
                            )


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.execute(select(Product)).scalars().all()

    return [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock_quantity": product.stock_quantity,
            "is_active": product.is_active,
        }
        for product in products
    ]


@app.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = db.get(Product, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": float(product.price),
        "stock_quantity": product.stock_quantity,
        "is_active": product.is_active,
    }


@app.post("/products", status_code=201)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
):
    product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        stock_quantity=product_data.stock_quantity,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": float(product.price),
        "stock_quantity": product.stock_quantity,
        "is_active": product.is_active,
    }


@app.post("/register", status_code=201)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = db.execute(
        select(User).where(
            (User.email == user_data.email)
            | (User.username == user_data.username)
        )
    ).scalar_one_or_none()

    if existing_user is not None:
        raise HTTPException(
            status_code=409,
            detail="Email or username already exists",
        )

    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hash_password(user_data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "is_active": user.is_active,
    }


@app.post("/login")
def login_user(
    user_data: UserLogin,
    db: Session = Depends(get_db),
):
    user = db.execute(
        select(User).where(User.email == user_data.email)
    ).scalar_one_or_none()

    if user is None or not verify_password(
        user_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User account is inactive",
        )

    access_token = create_access_token(user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@app.get("/me")
def get_current_user(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "is_active": user.is_active,
    }


@app.post("/cart", status_code=201)
def add_to_cart(
    cart_data: CartItemCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    product = db.get(Product, cart_data.product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if not product.is_active:
        raise HTTPException(
            status_code=400,
            detail="Product is inactive",
        )

    if cart_data.quantity > product.stock_quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )

    existing_item = db.execute(
        select(CartItem).where(
            (CartItem.user_id == user_id)
            & (CartItem.product_id == cart_data.product_id)
        )
    ).scalar_one_or_none()

    if existing_item is not None:
        new_quantity = existing_item.quantity + cart_data.quantity

        if new_quantity > product.stock_quantity:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock",
            )

        existing_item.quantity = new_quantity
        cart_item = existing_item

    else:
        cart_item = CartItem(
            user_id=user_id,
            product_id=cart_data.product_id,
            quantity=cart_data.quantity,
        )

        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)

    return {
        "id": cart_item.id,
        "user_id": cart_item.user_id,
        "product_id": cart_item.product_id,
        "quantity": cart_item.quantity,
    }

@app.get("/cart")
def get_cart(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    cart_items = db.execute(
        select(CartItem).where(CartItem.user_id == user_id)
    ).scalars().all()

    cart = []

    for item in cart_items:
        product = db.get(Product, item.product_id)

        if product is None:
            continue

        cart.append(
            {
                "id": item.id,
                "product_id": product.id,
                "product_name": product.name,
                "price": float(product.price),
                "quantity": item.quantity,
                "subtotal": float(product.price) * item.quantity,
            }
        )

    return {
        "user_id": user_id,
        "items": cart,
    }

@app.post("/orders", status_code=201)
def create_order(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    cart_items = db.execute(
        select(CartItem).where(CartItem.user_id == user_id)
    ).scalars().all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty",
        )

    total_amount = 0.0
    order_items_data = []

    for cart_item in cart_items:
        product = db.get(Product, cart_item.product_id)

        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        if not product.is_active:
            raise HTTPException(
                status_code=400,
                detail=f"Product {product.id} is inactive",
            )

        if cart_item.quantity > product.stock_quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product.id}",
            )

        item_price = float(product.price)
        subtotal = item_price * cart_item.quantity
        total_amount += subtotal

        order_items_data.append(
            {
                "product_id": product.id,
                "quantity": cart_item.quantity,
                "price": item_price,
            }
        )

    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        status="pending",
    )

    db.add(order)
    db.flush()

    for item in order_items_data:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item["product_id"],
            quantity=item["quantity"],
            price=item["price"],
        )
        db.add(order_item)

    for cart_item in cart_items:
        product = db.get(Product, cart_item.product_id)
        product.stock_quantity -= cart_item.quantity
        db.delete(cart_item)

    db.commit()
    db.refresh(order)

    return {
        "id": order.id,
        "user_id": order.user_id,
        "total_amount": float(order.total_amount),
        "status": order.status,
        "items": order_items_data,
    }

@app.get("/orders")
def get_orders(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    orders = db.execute(
        select(Order)
        .where(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
    ).scalars().all()

    result = []

    for order in orders:
        order_items = db.execute(
            select(OrderItem).where(OrderItem.order_id == order.id)
        ).scalars().all()

        result.append(
            {
                "id": order.id,
                "user_id": order.user_id,
                "total_amount": float(order.total_amount),
                "status": order.status,
                "created_at": order.created_at.isoformat(),
                "items": [
                    {
                        "product_id": item.product_id,
                        "quantity": item.quantity,
                        "price": float(item.price),
                    }
                    for item in order_items
                ],
            }
        )

    return result
