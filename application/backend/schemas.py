from pydantic import BaseModel, EmailStr, Field


class ProductCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: str | None = None
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)


class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class CartItemCreate(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(ge=1)

class OrderCreate(BaseModel):
    pass
