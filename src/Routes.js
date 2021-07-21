
import { useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Product from "./components/Product";
import Main from "./components/Main";
// import Categories from './components/Categories'
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import isAuth from "./hoc/isAuth";
import AuthContext from "./contexts/AuthContext";
import AdminProfilePage from "./components/AdminProfilePage"
import CreateCategory from "./components/CreateCategory";
import CreateProduct from "./components/CreateProduct";
const Routes = () => {
  const context = useContext(AuthContext)
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/product" exact component={Product} />
      <Route path="/product/create" component={isAuth(CreateProduct)} />
    
      {/* <Route path=’/pets/edit’ cocdmponent={ isAuth(isAdmin(PetEdit)) } */}
      {/* <Route path="/login" component={LoginPage} /> */}
      {/* <Route path="/register" component={RegisterPage} /> */}
      <Route path='/logout'render={props => {
              context.logOut();
              return <Redirect to='/' />
            }} />
    <Route path="/register">
          {context.isLogged ? (< Redirect to="/login" />) : (< RegisterPage />)}
       </Route>
      
       <Route path="/login">
          {context.isLogged ?  (< Redirect to="/" />)  :  (< LoginPage />)}
       </Route>
         {/* Admin  */}
         <Route path="/admin/profile">
          {context.isLogged&&context.user.role==="admin" ?    (< AdminProfilePage/>) : (<  Redirect to="/"/>) }
       </Route>
       <Route path="/create/category">
          {context.isLogged&&context.user.role==="admin" ?   (< CreateCategory/>) : (<  Redirect to="/"/>)}
       </Route>
       <Route path="/create/product">
          {context.isLogged&&context.user.role==="admin" ?   (< CreateProduct/>) : (<  Redirect to="/"/>)}
       </Route>
  


      {/* <Route path="/" exact component={Home} /> */}
      {/* <Route path="/shop" exact component={Shop} /> - all products with filters
<Route path="/signin" exact component={Signin} /> - login
<Route path="/signup" exact component={Signup} /> - register
<PrivateRoute path="/user/dashboard" exact component={Dashboard} /> - user profile
<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} /> - admin profile
<AdminRoute path="/create/category" exact component={AddCategory} /> - for admin add category
<AdminRoute path="/create/product" exact component={AddProduct} /> - for admin add product
<Route path="/product/:productId" exact component={Product} /> - product page
<Route path="/cart" exact component={Cart} />
<AdminRoute path="/admin/orders" exact component={Orders} />
<PrivateRoute path="/profile/:userId" exact component={Profile} />
<PrivateRoute path="/admin/products" exact component={ManageProducts} />
<AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
<AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} /> */}
    </Switch>
    </BrowserRouter>
  );
};
export default Routes;
