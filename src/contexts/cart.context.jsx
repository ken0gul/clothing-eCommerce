import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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
  updateCartItemsReducer: () => null,
});

const INITIAL_STATE = {
  isOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        // cartItems: [...payload.cartItems],
        // total: payload.total,
        // cartCount: payload.cartCount,
        ...payload,
      };

    case "IS_OPEN":
      return { ...state, isOpen: payload };

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CART_REDUCER_ACTIONS = {
  SET_CARD_ITEMS: "SET_CART_ITEMS",
  IS_OPEN: "IS_OPEN",
};

export const CartProvider = ({ children }) => {
  const [{ isOpen, cartItems, cartCount, total }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const setIsOpen = (isOpenBool) => {
    console.log(isOpenBool);
    dispatch(createAction(CART_REDUCER_ACTIONS.IS_OPEN, isOpenBool));
  };

  const addItemToCart = (productToAdd) => {
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    updateCartItemsReducer(decrementItem(cartItems, productToRemove));
  };

  const removeItem = (itemToRemove) => {
    updateCartItemsReducer(remove(cartItems, itemToRemove));
  };

  const updateCartItemsReducer = (newCartItems) => {
    let cartCount = newCartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    const total = calculateTotal(newCartItems);

    const currentPayload = {
      cartCount,
      total,
      cartItems: newCartItems,
    };

    dispatch({
      type: CART_REDUCER_ACTIONS.SET_CARD_ITEMS,
      payload: currentPayload,
    });
  };
  const value = {
    isOpen,
    setIsOpen,
    cartItems,
    addItemToCart,
    cartCount,

    removeItemFromCart,
    removeItem,

    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
