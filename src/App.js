import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.scss";
import AuthContext from "./contexts/AuthContext";
import { isAuthenticated } from "./utils/auth";
import { getVerifiedUser } from "./utils/verifyUser";
import {
  addToCartSorage,
  getCartStorage,
  clearCartStorage
} from "./utils/cartServices";
import { setAdmin } from "./utils/seed";
import CartContext from "./contexts/CartContext";

function App(props) {
  const history = useHistory();
  const [userObject, setUserObject] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  // setAdmin();

  //context functions
  const logInFunc = (user) => {
    setUserObject(user);
    setIsLogged(true);
  };
  const logOutFunc = () => {
    setIsLogged(false);
    setUserObject(null);
    window.localStorage.clear();
  };
  const addProductFunc = (product) => {
    setProducts((oldArray) => [...oldArray, product]);
  };
  if (products?.length > 0) {
    addToCartSorage(products);
  }
  const clearCartFunc = () => {
    clearCartStorage();
    setProducts([]);
  };

  useEffect(() => {
    const productList = getCartStorage();

    if (productList.length > 0) {
      setProducts(productList);
      setQuantity(products?.length);
    }

    if (!isAuthenticated()) {
      setLoading(false);
      logOutFunc();
      return;
    }
    getVerifiedUser().then((response) => {
      if (response.user) {
        logInFunc(response.user);
      } else {
        logOutFunc();
        history.push("/");
      }
      setLoading(false);
    });
  }, [products.length]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <AuthContext.Provider
        value={{
          user: userObject,
          isLogged,
          logIn: logInFunc,
          logOut: logOutFunc
        }}
      >
        <CartContext.Provider
          value={{
            products: products,
            quantity,
            addProduct: addProductFunc,
            clearCart: clearCartFunc
          }}
        >
          {props.children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
