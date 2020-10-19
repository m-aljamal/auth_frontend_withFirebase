import { LOGGED_IN_USER, LOGOUT } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGGED_IN_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
}
