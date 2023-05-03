import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CartIconContainer,
  ItemCountContainer,
  ShoppingIcon,
} from "./cart-icon.styles";

const CartIcon = () => {
  const { isOpen, setIsOpen } = useContext(CartContext);
  const { cartItems, cartCount } = useContext(CartContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <CartIconContainer className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={handleToggle} />
      <ItemCountContainer className="item-count">
        {cartCount}
      </ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
