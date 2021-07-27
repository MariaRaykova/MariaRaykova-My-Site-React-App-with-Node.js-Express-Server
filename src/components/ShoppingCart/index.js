import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import { clearCartStorage } from "../../utils/cartSevices";
import { createNewOrder } from "../../utils/ordersServices";

import PageWrapper from "../PageWrapper";

const ShoppingCart = () => {
  const context = useContext(CartContext);
  const [items, setItems] = useState(null);
  // const index = 0;


  useEffect(() => {
    setItems(context.products);
  }, [items?.length]);

  const deleteItem = (id) => {};
  const finishClickHandler = () =>{
     createNewOrder(items)
    //  setItems(null);
    //  clearCartStorage()
  }
  const showItems = (items, index) => {
    return (
      <div>
        <h2>You have {`${context.quantity}`} items in your cart</h2>
        <hr />
        <ul className="list-group">
          {items?.map((i) => (
            <li
              key={i.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{i.index}</strong>
              <strong>{i.name}</strong>
              <strong>{i.price}</strong>
              <span
                onClick={() => deleteItem(i.id)}
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

  return (
    <PageWrapper
      title="Shopping Cart"
      description="Manage your cart items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {context.quantity > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Finish your order</h2>
          <div onClick={finishClickHandler}>Finish</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ShoppingCart;
