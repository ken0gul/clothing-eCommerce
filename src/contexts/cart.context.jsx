import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  let isExistingProduct = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (isExistingProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // in case we don't have any products in the cart
  // let's return a brandnew array contaning only this new product
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = { isOpen, setIsOpen, cartItems, addItemToCart, cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
