import { API } from "../../config";
import {
  getProductService,
  getProducts,
  getCategories,
  getProductsByCategory
} from "../../utils/getProductService";
//https://github.com/cornflourblue/react-hooks-redux-registration-login-example/
//https://github.com/TheCoderDream/React-Ecommerce-App-with-Redux/
//https://github.com/IbrahiimKamal/react-redux-hooks-ecommerce
//https://github.com/levelopers/Ecommerce-Reactjs/

const getAllProducts = () => (dispatch) => {
  dispatch({
    type: GET_ALL_PRODUCTS_REQUEST
  });
  getProducts()
    .then((res) => {
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: res
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload: { error }
      });
      return error;
    });
};
const getAllCategories = () => (dispatch) => {
  dispatch({
    type: GET_ALL_CATEGORIES_REQUEST
  });
  getCategories()
    .then((res) => {
      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: res
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_CATEGORIES_FAIL,
        payload: { error }
      });
      return error;
    });
};

const getProduct = (id) => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST
  });
  getProductService(id)
    .then((product) => {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: product[0]
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload: { err }
      });
      return err;
    });
};

const getAllProductsByCategory = (queryParam) => (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_BY_CATEGORY_REQUEST
  });
  getProductsByCategory(queryParam)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: res
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY_FAIL,
        payload: error
      });
      return error;
    });
};

// export const search=(text)=>dispatch=>{
//   dispatch({
//     type:SEARCH,
//   })
//   return serverCall({
//     method:'GET',
//     url:`/search?query=${text}`
//   })
//   .then(res=>{
//     dispatch({
//       type: SEARCH_SUCCESS,
//       payload: res
//     })
//     return res
//   })
//   .catch(error=>{
//     dispatch({
//       type: SEARCH_FAIL,
//       payload: {error}
//     })
//     return error
//   })
// }

// export const applyFilters=(filter_string)=>dispatch=>{
//   dispatch({
//     type:APPLY_FILTERS,
//   })
//   return serverCall({
//     method:'GET',
//     url:`/products?${filter_string}`
//   })
//   .then(res=>{
//     dispatch({
//       type: APPLY_FILTERS_SUCCESS,
//       payload: res
//     })
//     return res
//   })
//   .catch(error=>{
//     dispatch({
//       type: APPLY_FILTERS_FAIL,
//       payload: {error}
//     })
//     return error
//   })
// }

// export const APPLY_FILTERS_REQUEST = "APPLY_FILTERS";
// export const APPLY_FILTERS_SUCCESS = "APPLY_FILTERS_SUCCESS";
// export const APPLY_FILTERS_FAIL = "APPLY_FILTERS_FAIL";

// export const SEARCH_REQUEST = "SEARCH";
// export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
// export const SEARCH_FAIL = "SEARCH_FAIL";
export const productActions = {
  getAllProducts,
  getProduct,
  getAllCategories,
  getAllProductsByCategory
};
export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAIL = "GET_ALL_PRODUCTS_FAIL";

export const GET_ALL_CATEGORIES_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_CATEGORIES_FAIL = "GET_ALL_PRODUCTS_FAIL";

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";

export const GET_PRODUCTS_BY_CATEGORY_REQUEST =
  "GET_PRODUCTS_BY_CATEGORY_REQUEST";
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS =
  "GET_PRODUCTS_BY_CATEGORY_SUCCESS";
export const GET_PRODUCTS_BY_CATEGORY_FAIL = "GET_PRODUCTS_BY_CATEGORY_FAIL";
