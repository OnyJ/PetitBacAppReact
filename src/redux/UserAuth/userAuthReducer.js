import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_LOADING,
} from "./userAuthTypes";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  currentUser: null,
  status: null,
  isLoading: true,
  isRegistered: false,
  isLogged: false,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      
      return {
        ...state,
        type: LOGIN_SUCCESS,
        token: action.user.token,
        currentUser: action.user.user,
        isLoading: false,
        isRegistered: true,
        isLogged: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        type: LOGIN_FAIL,
        status: action.status,
        isLoading: false,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        type: LOGIN_LOADING,
        status: action.status,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        type: REGISTER_SUCCESS,
        user: action.user,
        status: action.status,
        isLoading: false,
        isRegistered: true,
      };
    case LOGOUT_SUCCESS:
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        user: null,
        isLogged: false,
      };

    default:
      return state;
  }
};

export default userAuthReducer;
