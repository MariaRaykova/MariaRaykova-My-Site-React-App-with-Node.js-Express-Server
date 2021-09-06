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
  GET_PRODUCTS_BY_CATEGORY_FAIL, 
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_CLEAR,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAIL,
  ADD_IMAGE_TO_LIST
} from "../action/productsActions";

const initialState = {
  products: null,
  categories: [],
  product: {},
  url: null,
  images: [],
  mainImage: null,
  loading: false,
  error: null,
  imageList: []
};
export const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        //без ...state ще занули всички отстанали неща от initial state-а при следващия fetch, success или fail
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
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

      return {
        loading: false,
        categories: action.payload
      };
    case GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
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
        product: action.payload,
        images: action.payload.images,
        mainImage: action.payload.images[0]
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
      case UPLOAD_IMAGE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          url:null,
        };
      case UPLOAD_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          url: action.payload.secure_url
        };
      case UPLOAD_IMAGE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
        case UPLOAD_IMAGE_CLEAR:
          return {
            ...state,
            url: action.payload
          };
        case ADD_IMAGE_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };
        case ADD_IMAGE_SUCCESS:
          return {
            ...state,
            loading: false,
            url: action.payload.url
          };
        case ADD_IMAGE_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error
          };
      
            // case ADD_IMAGE_TO_LIST: 
            // console.log("ot reducer state.imageList " +state.imageList )
            // // console.log("ot reducer new image ot action -a " + newImage )
            // return {
            //   ...state, 
            //   imageList: [...state.imageList, action.newImage]
            // }
                      
          // ...state, imageList: state.imageList.push([action.newImage]) , tova za obekt ..  imageList: [...state.imageList, action.newImage] 
                  
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
