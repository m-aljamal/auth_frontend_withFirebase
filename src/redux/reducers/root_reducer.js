import { combineReducers } from "redux";
import authReducer from "./auth_reducer";

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
