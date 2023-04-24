import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  let navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  return (
    <div className={`cart-dropdown-container `}>
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={() => navigate("/checkout")}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
