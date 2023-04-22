import { useContext } from "react";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { isOpen } = useContext(CartContext);
  return (
    <div className={`cart-dropdown-container `}>
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
