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

const decrementItem = (cartItems, productToRemove) => {
  // find the cart to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  // return back cartItems with matching cart item with reduced quantity

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const remove = (cartItems, removeItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === removeItem.id
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem.id !== removeItem.id);
  }
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
};

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  removeItemFromCart: () => {},
  removeItem: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let count = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    // console.log(productToAdd);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(decrementItem(cartItems, productToRemove));
  };

  const removeItem = (itemToRemove) => {
    setCartItems(remove(cartItems, itemToRemove));
  };

  useEffect(() => {
    const total = calculateTotal(cartItems);
    setTotal(total);
  }, [cartItems]);

  const value = {
    isOpen,
    setIsOpen,
    cartItems,
    addItemToCart,
    cartCount,
    setCartCount,
    removeItemFromCart,
    removeItem,

    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
