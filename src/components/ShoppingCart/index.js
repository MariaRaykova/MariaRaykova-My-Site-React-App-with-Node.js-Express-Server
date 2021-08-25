import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";
import { clearCartStorage } from "../../utils/cartServices";
import { createOrder } from "../../utils/ordersServices";
import PageWrapper from "../PageWrapper";

const Cart = () => {
  const history = useHistory();
  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const userId = authContext.user?._id ? authContext.user?._id : "";
  // const index = 0;
  // const [products, s] = useState([]);
  // const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(context.products);

    if (userId !== "") {
      setUserName(authContext.user.name);
      setUserEmail(authContext.user.email);
    }
  }, [next, success, userId, context.quantity]);

  const deleteItem = (id) => {};

  const orderDetailsHandler = () => {
    setNext(true);
  };
  // const getTotal = () => {
  //   return items.reduce((currentValue, nextValue) => {
  //     return currentValue + nextValue.count * nextValue.price;
  //   }, 0);
  // };
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
        <h2>You have {`${context.quantity}`} items in your cart</h2>
        <hr />
        <ul className="list-group">
          {items?.map((i) => (
            <li
              key={i._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* <strong>{i._id}</strong> */}
              {/* <strong>{i.index}</strong> */}
              <strong>{i.name}</strong>
              <strong>{i.price}</strong>
              <span
                onClick={() => deleteItem(i._id)}
                className="badge badge-danger badge-pill"
              >
                Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/">Continue shopping</Link>
    </h2>
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
              {/* <p className="field">
                <label htmlFor="firstName">First Name</label>
                <span className="input">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="firstName"
                  />
                  <span className="actions"></span>
                </span>
              </p> */}
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
        <div className="row">
          {context.quantity > 0 ? (
            <div className="col-6">
              {showItems(items)}
              <h2 className="mb-4">Finish your order</h2>
              <button onClick={orderDetailsHandler}>Continue</button>
              {showOrderDetails()}
            </div>
          ) : (
            <div className="col-6">{noItemsMessage()}</div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default Cart;
