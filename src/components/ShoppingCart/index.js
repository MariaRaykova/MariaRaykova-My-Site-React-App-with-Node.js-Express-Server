import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";
import { clearCartStorage } from "../../utils/cartServices";
import { createOrder } from "../../utils/ordersServices";
import PageWrapper from "../PageWrapper";
import { emptyCart, loadCart, finishOrder } from "../../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem";
import Checkout from "../Checkout/stripe-checkout"

// import { STRIPE_PUBLISHABLE } from '../../config';


const Cart = () => {
  // const promise = loadStripe(STRIPE_PUBLISHABLE)
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [next, setNext] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const userId = authContext.user?._id ? authContext.user?._id : "";
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
const  isFinished = useSelector((state) => state.cartReducer.finishOrder);
const dispatch = useDispatch();
// const ELEMENTS_OPTIONS = {
//   fonts: [
//     {
//       cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
//     }
//   ]
// };
  useEffect(() => {
    dispatch(loadCart());
       if (userId !== "") {
      setUserName(authContext.user.name);
      setUserEmail(authContext.user.email);
    }
    
    setNext(true);
  }, [isFinished]);


  const getTotal = () => {
    return cartProducts.reduce((total, currItem) => {
      return total + currItem.count * currItem.product.price;
    }, 0);
  };
  const onOrderSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const userName = e.target.name.value;
    const phone = e.target.phone.value;
    const city = e.target.city.value;
    const address = e.target.address.value;
    const totalAmount = getTotal()
   console.log(e.target.city.value)
   console.log(e.target.address.value)
   
    createOrder({ email, name: userName, phone, city, address, userId, cartProducts, totalAmount }).then(
      (res) => {
        dispatch(emptyCart())
        setNext(false);
        setSuccess(true);
        dispatch(finishOrder(false));
      }
    );
  };


  const showSuccess = () => (
    <div className="alert alert-info"></div>
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
const onDelete =()=>{
  setNext(false);
}

  const noItemsMessage = () => (
    <h3>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h3>
  );
  const showOrderDetails = (items, userId) => {
    if (next) {
      return (
        <section className="order">
     <form onSubmit={onOrderSubmitHandler}>
            <fieldset>
              <legend>Shipping Details</legend>
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
                    value={userName}
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
            </fieldset>
            {isFinished ? (<button className="btn-pink" type="submit" > Payment Successful! Finish your order</button>) : null }
          </form>
        </section>
      )
    }
  };

  return (
    <PageWrapper
      title="Shopping Cart" >
      {success 
      ? (showSuccess() ) 
      : ( 
      <div>
        <div >
          {cartProducts?.length > 0 ? (
            <div>
              {showItems(cartProducts)}
              <div>
                      <div className="pull-right" style={{margin: '5px', paddingRight: '70px'}}>
                          Total price: <b>{getTotal()}€</b>
                      </div>
              </div>
              <h3 className="card-header">Finish your order</h3>
              {showOrderDetails()}
              {/* <button className="btn-pink" onClick={orderDetailsHandler}>Continue</button> */}
              {/* <button className="btn-pink" onClick={()=>{dispatch(emptyCart())}}>Clear Cart</button> */}
            </div>
          ) : (
            <div className="col-6">{noItemsMessage()}</div>
          )}
            <Checkout name={userName} email={userEmail} />
        </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Cart;
