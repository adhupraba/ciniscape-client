import React, { useContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import jwt from "jsonwebtoken";
import axios from "axios";
import errorResponse from "../../utils/errorResponse";
import { server } from "../../utils/urls";

const initialState = {
  user: null,
  token: null,
};

const token = localStorage.getItem("QlmVhATFWF");

if (token) {
  const decodedToken = jwt.decode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("QlmVhATFWF");
  } else {
    initialState.token = token;
    initialState.user = decodedToken;
  }
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (userData) => {
    try {
      await axios.post(`${server}/api/auth/signu`, userData);
    } catch (error) {
      errorResponse(error);
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post(`${server}/api/auth/login`, userData);

      sessionStorage.removeItem("prevSearches");
      sessionStorage.removeItem("history");
      sessionStorage.removeItem("homepage");

      dispatch({
        type: LOGIN,
        payload: {
          token: data.token,
          user: data.user,
        },
      });
    } catch (error) {
      errorResponse(error);
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    sessionStorage.removeItem("prevSearches");
    sessionStorage.removeItem("history");
    sessionStorage.removeItem("homepage");
  };

  const values = {
    token: state.token,
    user: state.user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
