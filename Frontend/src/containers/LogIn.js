import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { login } from "../actions/auth";
import { connect } from "react-redux";
import Alert from "../components/Alert";
import CSRFToken from "../components/CSRFToken";

import Loader from "react-loader-spinner";

const LogIn = ({ login, auth, loading }) => {
  // RESET- After a successful Re-direct from the sign up page.
  auth.redirect = false;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    //
    loading = true;

    login(email, password);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Helmet>
        <title> BloQuote - Login </title>
        <meta name="description" content="BloQuote SignUp page" />
      </Helmet>

      <div className="container mt-5 signup__box auth">
        <div className="col-4 mt-5 text-center">
          <Link className="blog-header-logo text-dark" to="/">
            <span className="bloquote__brand1">Blo</span>
            <span className="bloquote__brand2">Quote</span>
          </Link>
        </div>
        <p className="auth__lead">Log In to Account</p>
        <Alert />
        <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
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

          {loading ? (
            <div className="listingform__loader">
              <Loader type="Oval" color="#424242" height={50} width={50} />
            </div>
          ) : (
            <button className="auth__form__button">Log In</button>
          )}
        </form>
        <p className="auth__authtext">
          Don't have an account?-
          <Link className="auth__authtext__link" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LogIn);
