import axios from "axios";
import { setAlert } from "./alert";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
import Cookies from "js-cookie";

// CHECK AUTHENTICATED
export const checkAuth = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/bloggers/checkAuth`,
      config
    );

    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: res.data.user,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/bloggers/login`,
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
      dispatch(setAlert(res.data.success, "success"));
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(setAlert(res.data.error, "error"));
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Something went wrong, Try again", "error"));
  }
};

// Signup
export const signup = (
  first_name,
  last_name,
  email,
  password,
  password2,
  group
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    password2,
    group,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/bloggers/signup`,
      body,
      config
    );

    if (res.data.error) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch(setAlert(res.data.error, "error"));
    } else {
      dispatch({
        type: SIGNUP_SUCCESS,
      });

      dispatch(setAlert(res.data.success, "success"));
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });

    dispatch(setAlert("Something went wrong, Try again", "error"));
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ withCredentials: true });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/bloggers/logout`,
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch(setAlert(res.data.success, "success"));
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
      dispatch(setAlert(res.data.error, "error"));
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
    dispatch(setAlert("Something went wrong, Try again!", "error"));
  }
};
