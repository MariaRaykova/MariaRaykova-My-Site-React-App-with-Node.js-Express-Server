
import { useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Main from "./components/Main";
import LoginPage from "./components/User/LoginPage";
import RegisterPage from "./components/User/RegisterPage";
// import isAuth from "./hoc/isAuth";
import AuthContext from "./contexts/AuthContext";
import AdminProfilePage from "./components/Admin/AdminProfilePage"
import CreateCategory from "./components/Admin/CreateCategory";
import CreateProduct from "./components/Admin/CreateProduct";
import EditProduct from "./components/Admin/EditProduct"
import ProductPage from "./components/ProductPage"
import ShoppingCart from "./components/ShoppingCart"

// import Orders from "./components/Orders"
import UserProfilePage from "./components/User/ProfilePage"

const Routes = (props) => {
  const context = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/product/:category" component={Main} />
        <Route path="/product/:id" exact component={ProductPage} />
        <Route path="/cart" exact component={ShoppingCart} />
        {/* <Route path="/orders" exact component={Orders} /> */}
        <Route path="/user/profile/:id" >
        {context.isLogged && context.user.role === "user" ? (< UserProfilePage />) : (<  Redirect to="/" />)} 
          </Route>
        <Route path="/login">
          {context.isLogged ? (< Redirect to="/" />) : (< LoginPage />)}
        </Route>
        <Route path="/register">
          {context.isLogged ? (< Redirect to="/login" />) : (< RegisterPage />)}
        </Route>
        <Route path='/logout' render={props => {
          context.logOut();
          return <Redirect to='/' />
        }} />
        {/* Admin  */}
        <Route path="/admin/profile">
          {context.isLogged && context.user.role === "admin" ? (< AdminProfilePage />) : (<  Redirect to="/" />)}
        </Route>
        <Route path="/admin/category/create">
          {context.isLogged && context.user.role === "admin" ? (< CreateCategory />) : (<  Redirect to="/" />)}
        </Route>
        <Route path="/admin/product/create">
          {context.isLogged && context.user.role === "admin" ? (< CreateProduct />) : (<  Redirect to="/" />)}
        </Route>
         <Route path="/admin/product/edit/:id">
          {context.isLogged && context.user.role === "admin" ? ( <EditProduct />) : (<Redirect to="/" /> )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
