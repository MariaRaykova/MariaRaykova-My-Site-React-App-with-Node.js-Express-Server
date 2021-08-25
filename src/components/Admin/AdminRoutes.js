// import { useContext } from "react";
// import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
// import AuthContext from "../../contexts/AuthContext";
// import CreateCategory from "./CreateCategory";
// import CreateProduct from "./CreateProduct";
// import { deleteCategory } from "./adminHandlers";

// const AdminRoutes = (props) => {
//   const context = useContext(AuthContext);
//   return (
//     // <BrowserRouter>
//     <Switch>
//       <Route path="admin/creteCategory">
//         {context.isLogged && context.user.role === "admin" ? (
//           <CreateCategory />
//         ) : (
//           <Redirect to="/" />
//         )}
//       </Route>
//       <Route path="admin/category/edit">
//         {context.isLogged && context.user.role === "admin" ? (
//           <CreateCategory />
//         ) : (
//           <Redirect to="/" />
//         )}
//       </Route>
//       <Route path="admin/create/product">
//         {context.isLogged && context.user.role === "admin" ? (
//           <CreateProduct />
//         ) : (
//           <Redirect to="/" />
//         )}
//       </Route>
//       <Route
//         path="/admin/category/delete/:categoryId"
//         render={(props) => {
//           const id = props.params.categoryId;
//           deleteCategory(id);
//           return <Redirect to="/admin/category" />;
//         }}
//       />
//       {/* <Route path="/" exact component={Home} /> */}
//       {/* <Route path="/shop" exact component={Shop} /> - all products with filters
// <Route path="/signin" exact component={Signin} /> - login
// <Route path="/signup" exact component={Signup} /> - register
// <PrivateRoute path="/user/dashboard" exact component={Dashboard} /> - user profile
// <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} /> - admin profile
// <AdminRoute path="/create/category" exact component={AddCategory} /> - for admin add category
// <AdminRoute path="/create/product" exact component={AddProduct} /> - for admin add product
// <Route path="/product/:productId" exact component={Product} /> - product page
// <Route path="/cart" exact component={Cart} />
// <AdminRoute path="/admin/orders" exact component={Orders} />
// <PrivateRoute path="/profile/:userId" exact component={Profile} />
// <PrivateRoute path="/admin/products" exact component={ManageProducts} />
// <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
// <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} /> */}
//     </Switch>
//     // </BrowserRouter>
//   );
// };
// export default AdminRoutes;
