import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/currency";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <article className="cart-item-new">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <span>{item.brand}</span>
        <h3>{item.name}</h3>
        <strong>{formatCurrency(item.price)}</strong>

        <div className="cart-item-actions">
          <div className="quantity-control">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              disabled={item.quantity >= item.stock}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="remove-cart-button"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>

      <strong className="cart-item-total">
        {formatCurrency(item.price * item.quantity)}
      </strong>
    </article>
  );
}

export default CartItem;
