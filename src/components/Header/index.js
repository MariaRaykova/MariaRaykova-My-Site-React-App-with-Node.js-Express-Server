import {useState, useEffect} from "react"
import { NavLink } from "react-router-dom";
import "./index.scss";
// import ButtonDark from '../ButtonDark'
// import ButtonLight from '../ButtonLight'
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";

const Header = () => {
  const context = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(0)
 console.log("cart context quantity izvyn predi" + cartContext.products.length)
  useEffect(()=>{
     console.log("cart context quantity vytre " + cartContext.products.length)
    setQuantity(cartContext.products.length)
  },[cartContext.quantity])
  console.log("cart context quantity sled " + cartContext.products.length)

  const profilePage = () => {
    if (context.isLogged && context.user.role === "admin") {
      return (
        <li>
          <NavLink activeClassName="nav-link-selected" to="/admin/profile">
            Admin Profile
          </NavLink>
        </li>
      );
    }
    if (context.isLogged && context.user.role === "user") {
      return (
        <li>
          <NavLink
            activeClassName="nav-link-selected"
            to={`/user/profile/${context.user._id}`}
          >
            User Profile
          </NavLink>
        </li>
      );
    }
  };
  return (
    <header className="site-header">
      <div className="content-limiter">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li>
              <NavLink activeClassName="nav-link-selected" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/catalog">
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
        <section className="logo">
          <div className="logo-nd">New Desire</div>
          <div className="logo-boutique">Boutique</div>
        </section>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/catalog">
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link-selected" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-buttons">
          <NavLink to="/">
            <i className="fa fa-search"></i>
          </NavLink>
          <NavLink to="/cart">
            <i className="fa fa-shopping-cart">
              <sub>
                <small>{cartContext.quantity}</small>
              </sub>
            </i>
          </NavLink>
        </div>
        <div className="second-bar">
          {context.isLogged ? (
            <ul>
              <li>Welcome,{context.user?.name}!</li>
              {profilePage()}
              <li>
                <NavLink to="/logout">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/login">
                  <i className="fas fa-sign-in-alt"></i> LogIn
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <i className="fas fa-register-alt"></i> Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
