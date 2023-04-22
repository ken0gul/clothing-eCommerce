import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isOpen, setIsOpen } = useContext(CartContext);
  console.log(isOpen);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={handleToggle} />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;