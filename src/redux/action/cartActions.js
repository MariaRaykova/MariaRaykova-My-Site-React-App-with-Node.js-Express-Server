import store from '../store';

// export const ADD_CART_TO_STORAGE = 'ADD_CART_TO_STORAGE';
export const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREMENT_CART_ITEM_QUANTITY = 'INCREMENT_CART_ITEM_QUANTITY';
export const DECREMENT_CART_ITEM_QUANTITY = 'DECREMENT_CART_ITEM_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';
import {getCartStorage, addToCartStorage, clearCartStorage} from "../../utils/cartServices"

export const loadCart = () => {
    return {
        type: GET_CART_PRODUCTS,
        payload: getCartStorage() ? getCartStorage() : []
    }
}
export const addToCartAction = product => (dispatch)=> {
    dispatch(loadCart());
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: product
    });
    addToCartStorage(store.getState().cartReducer.cartProducts);
};

export const removeProductToCart = productId => (dispatch)=>{
    dispatch({ 
        type: REMOVE_PRODUCT_FROM_CART, 
        payload: productId
    });
   addToCartStorage(store.getState().cartReducer.cartProducts);
};

export const incrementCartQuantity = productId => dispatch=> {
    return{
        type: INCREMENT_CART_ITEM_QUANTITY,
        payload: productId
    }
};

export const decrementCartQuantity = productId => dispatch=> {
  return {
      type: DECREMENT_CART_ITEM_QUANTITY,
      payload: productId
  }
};

export const emptyCart = () => {
    clearCartStorage()
    return {
        type: EMPTY_CART,
        payload: []
    }
}