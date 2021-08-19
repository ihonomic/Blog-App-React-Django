import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import { setAlert } from "../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../actions/auth";

import Alert from "../components/Alert";
import Loader from "react-loader-spinner";
import CSRFToken from "../components/CSRFToken";

const SignUp = ({ setAlert, signup, auth }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    group: "Writer",
  });

  const { first_name, last_name, email, password, password2, group } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    auth.loading = true;

    signup(first_name, last_name, email, password, password2, group);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else if (auth.redirect) {
    return <Redirect to="login" />;
  }

  return (
    <Fragment>
      <Helmet>
        <title> BloQuote - Sign Up | New Members </title>
        <meta name="description" content="BloQuote SignUp page" />
      </Helmet>

      <div className="container mt-5 signup__box auth">
        <div className="col-4 mt-5 text-center">
          <Link className="blog-header-logo text-dark" to="/">
            <span className="bloquote__brand1">Blo</span>
            <span className="bloquote__brand2">Quote</span>
          </Link>
        </div>
        <p className="auth__lead">Create an Account</p>
        <Alert />
        <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
          <div className="auth__form__group">
            <input
              className="auth__form__input"
              type="text"
              placeholder="First name"
              name="first_name"
              value={first_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="auth__form__group">
            <input
              className="auth__form__input"
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="auth__form__group">
            <input
              className="auth__form__input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="auth__form__group">
            <input
              className="auth__form__input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>

          <div className="auth__form__group">
            <input
              className="auth__form__input"
              type="password"
              placeholder="Repeat Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>

          <div className="auth__form__group">
            <label htmlFor="group" className="listingform__label">
              <p>What do you intend to do on BloQuote? </p>

              <span className="span">Hint:</span>
              <ul>
                <li>
                  As a reader, you only have limited access to read, like and
                  comment
                </li>
                <li>
                  As a writer, you'll be eligible to read, write, comment & like
                  all articles (Recommended)
                </li>
              </ul>
            </label>

            <select
              className="auth__form__input"
              name="group"
              id=""
              value={group}
              onChange={(e) => onChange(e)}
            >
              <option>Writer</option>
              <option>Reader</option>
            </select>
          </div>

          <div className="auth__form__group">
            <input className="auth__form__input" type="checkbox" required /> You
            accept BloQuote
            <Link className="auth__authtext__link" to="#">
              Terms & conditons
            </Link>
          </div>

          {auth.loading ? (
            <div className="listingform__loader">
              <Loader type="Oval" color="#424242" height={50} width={50} />
            </div>
          ) : (
            <button className="auth__form__button">Sign Up</button>
          )}
        </form>
        <p className="auth__authtext">
          Already have an account?-
          <Link className="auth__authtext__link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { signup, setAlert })(SignUp);
