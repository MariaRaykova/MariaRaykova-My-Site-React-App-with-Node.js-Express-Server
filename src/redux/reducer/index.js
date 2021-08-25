import { combineReducers } from "redux";
import { prodReducer } from "./productsReducer";

const rootReducer = combineReducers({
  productsReducer: prodReducer //първото е след state-a в useSelector
  // registration,
  // users,
  // alert
});

export default rootReducer;
