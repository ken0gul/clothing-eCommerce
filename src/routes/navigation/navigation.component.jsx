import { Fragment, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { logOut } from "../../utils/firebase/firebase-utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { NavLinks, NavigationContainer } from "./navigation.styles";
import { LogoContainer } from "./navigation.styles";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await logOut();
    // We no longer need to setCurrentUser to null given it's taken care of by onAuthStateChanged
    // setCurrentUser(null);
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to={"/"}>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {/* short curcuiting */}
        {isOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
