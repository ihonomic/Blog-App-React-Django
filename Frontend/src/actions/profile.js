import axios from "axios";
import { setAlert } from "./alert";
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from "./types";
import Cookies from "js-cookie";

// Update profile
export const update_user = (
  first_name,
  last_name,
  phone,
  city,
  country,
  bio
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
    first_name,
    last_name,
    phone,
    city,
    country,
    bio,
  });

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/bloggers/update_blogger`,
      body,
      config
    );

    if (res.data.blogger) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data.blogger,
      });
      dispatch(setAlert("Profile Updated", "success"));
    } else {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
      dispatch(setAlert(res.data.error, "error"));
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
    dispatch(setAlert("Something went wrong", "error"));
  }
};

// DELETE PROFILE
export const delete_user = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ withCredentials: true });

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/bloggers/delete_blogger`,
      config,
      body
    );

    if (res.data.success) {
      dispatch({
        type: DELETE_PROFILE_SUCCESS,
      });
      dispatch(setAlert(res.data.success, "success"));
    } else {
      dispatch({
        type: DELETE_PROFILE_FAIL,
      });
      dispatch(setAlert(res.data.error, "error"));
    }
  } catch (err) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
    });
    dispatch(setAlert("Something went wrong", "error"));
  }
};
