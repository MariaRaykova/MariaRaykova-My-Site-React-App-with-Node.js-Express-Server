
import { useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Product from "./components/Product";
import Main from "./components/Main";
// import Categories from './components/Categories'
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import isAuth from "./hoc/isAuth";
import AuthContext from "./contexts/AuthContext";
import AdminProfilePage from "./components/Admin/AdminProfilePage"
import CreateCategory from "./components/Admin/CreateCategory";
import CreateProduct from "./components/Admin/CreateProduct";
import { getProductsByCategory } from "./utils/getData";
const Routes = (props) => {
  const context = useContext(AuthContext)
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/product/:category" component={Main} />
      <Route path="/product" exact component={Product} />

      <Route path="/login">
          {context.isLogged ?  (< Redirect to="/" />)  :  (< LoginPage />)}
       </Route>
       <Route path="/register">
          {context.isLogged ? (< Redirect to="/login" />) : (< RegisterPage />)}
       </Route>
       <Route path='/logout'render={props => {
              context.logOut();
              return <Redirect to='/' />
            }} />
               {/* Admin  */}
         <Route path="/admin/profile">
          {context.isLogged&&context.user.role==="admin" ?    (< AdminProfilePage/>) : (<  Redirect to="/"/>) }
       </Route>
       <Route path="/admin/create/category">
          {context.isLogged&&context.user.role==="admin" ?   (< CreateCategory/>) : (<  Redirect to="/"/>)}
       </Route>
       <Route path="/admin/create/product">
          {context.isLogged&&context.user.role==="admin" ?   (< CreateProduct/>) : (<  Redirect to="/"/>)}
       </Route>
      {/* <Route path="/product/create" component={isAuth(CreateProduct)} /> */}
   
    </Switch>
    </BrowserRouter>
  );
};
export default Routes;
