import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAIL
} from "../action/productsActions";

const initialState = {
  products: null,
  categories: null,
  product: {},
  loading: false,
  error: null
};
export const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      console.log("ot redux playload " + action.playload)
      return {
        loading: false,
        categories: action.payload
      };
    case GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      };
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      };

    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case GET_PRODUCTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      };

    case GET_PRODUCTS_BY_CATEGORY_FAIL:
      return {
        ...state,

        loading: false,

        error: action.payload.error
      };

    //   case SEARCH:
    //     return {
    //       ...state,
    //       loading: true,
    //       error: null
    //     }
    //   case SEARCH_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       products: action.payload.data.products
    //     }
    //   case SEARCH_FAIL:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: action.payload.error.response.data
    //     }
    //   case APPLY_FILTERS:
    //     return {
    //       ...state,
    //       loading: true,
    //       error: null
    //     }
    //   case APPLY_FILTERS_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       products: action.payload.data.products
    //     }
    //   case APPLY_FILTERS_FAIL:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: action.payload.error.response.data
    //     }
    default:
      return state;
  }
};
