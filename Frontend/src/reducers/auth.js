import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  loading: false,
  redirect: false,
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  city: "",
  country: "",
  bio: "",
  user_photo: "",
  groups: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case AUTHENTICATED_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        city: payload.city,
        country: payload.country,
        bio: payload.bio,
        user_photo: payload.user_photo,
        groups: payload.groups,
      };
    case SIGNUP_SUCCESS:
    case AUTHENTICATED_FAIL:
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        redirect: true,
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        country: "",
        bio: "",
        user_photo: "",
        groups: [],
      };
    case LOGOUT_FAIL:
    case UPDATE_PROFILE_FAIL:
    case DELETE_PROFILE_FAIL:
      return { ...state };

    default:
      return state;
  }
}
