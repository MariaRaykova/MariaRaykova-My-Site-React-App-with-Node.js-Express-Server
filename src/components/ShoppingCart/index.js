import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";
import { clearCartStorage } from "../../utils/cartServices";
import { createOrder } from "../../utils/ordersServices";
import PageWrapper from "../PageWrapper";
import { emptyCart, loadCart } from "../../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem";

const Cart = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [next, setNext] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const userId = authContext.user?._id ? authContext.user?._id : "";
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
       if (userId !== "") {
      setUserName(authContext.user.name);
      setUserEmail(authContext.user.email);
    }
  }, []);

  const orderDetailsHandler = () => {
    setNext(true);
  };
  const getTotal = () => {
    return cartProducts.reduce((total, currItem) => {
      return total + currItem.count * currItem.product.price;
    }, 0);
  };
  const onOrderSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const city = e.target.city.value;
    const address = e.target.address.value;

    createOrder({ email, name, phone, city, address, userId, items }).then(
      (res) => {
        context.clearCart();
        // clearCartStorage();
        setNext(false);
        setSuccess(true);
      }
    );
  };
  const showSuccess = () => (
    <div className="alert alert-info">Thanks for your order!</div>
  );

  const showItems = () => {
    return (
      <div>
        <h3>You have {`${cartProducts?.length}`} items in your cart</h3>
        <hr />
        <ul className="list-group">
          {cartProducts?.map((i) => (
            <CartItem  key={i.product._id} {...i} />
          ))}
        </ul>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h3>
      Your cart is empty. <br /> <Link to="/">Continue shopping</Link>
    </h3>
  );
  const showOrderDetails = (items, userId) => {
    if (next) {
      return (
        <section className="order">
          <form onSubmit={onOrderSubmitHandler}>
            <fieldset>
              <legend>Address Details</legend>
              <p className="field">
                <label htmlFor="email">Email</label>
                <span className="input">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={userEmail}
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="name">Name</label>
                <span className="input">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={userEmail}
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="phone">Phone</label>
                <span className="input">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p>Delivery Address</p>
              <p className="field">
                <label htmlFor="city">City</label>
                <span className="input">
                  <input type="text" name="city" id="city" placeholder="City" />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="address">Address</label>
                <span className="input">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              {/* {getTotal()} */}
              <button className="btn btn-pink" type="submit">
                Order
              </button>
            </fieldset>
          </form>
        </section>
      );
    }
  };

  return (
    <PageWrapper
      title="Shopping Cart"
      // className="container-fluid"
    >
      {success ? (
        showSuccess()
      ) : (
        <div>
        <div className="card">
          {cartProducts?.length > 0 ? (
            <div className="card-body">
              {showItems(cartProducts)}
              <div className="card-footer">
                      <div className="pull-right" style={{margin: '5px', paddingRight: '70px'}}>
                          Total price: <b>{getTotal()}€</b>
                      </div>
              </div>
            </div>
          ) : (
            <div className="col-6">{noItemsMessage()}</div>
          )}
        </div>
        <h5 className="card-header">Finish your order</h5>
              <button className="btn-pink" onClick={orderDetailsHandler}>Continue</button>
              <button className="btn-pink" onClick={()=>dispatch(emptyCart())}>Clear Cart</button>
              {showOrderDetails()}
        </div>
      )}
      
                  
    </PageWrapper>
  );
};

export default Cart;
