import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";

const NavBar = ({ auth, logout }) => {
  const authLinks = (
    <Fragment>
      <Link to="/profile/dashboard">
        <img src={auth.user_photo} alt="" className="thumbnail-img" />
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link className="btn btn-sm btn-outline-secondary m-1" to="/login">
        Login
      </Link>
      <Link className="btn btn-sm btn-outline-secondary" to="/signup">
        Sign Up
      </Link>
    </Fragment>
  );

  return (
    <div className="container">
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link className="link-secondary" to="#">
              Subscribe
            </Link>
          </div>
          <div className="col-4 text-center">
            <Link className="blog-header-logo text-dark" to="/">
              <span className="bloquote__brand1">Blo</span>
              <span className="bloquote__brand2">Quote</span>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <Link className="link-secondary" to="#" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mx-3"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="M21 21l-5.2-5.2" />
              </svg>
            </Link>

            {!auth.loading && (
              <Fragment>
                {auth.isAuthenticated ? authLinks : guestLinks}
              </Fragment>
            )}
          </div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <NavLink className="p-2 link-secondary" to="/world">
            World
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/nigeria">
            Nigeria
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/tech">
            Technology
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/design">
            Design
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/culture">
            Culture
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/business">
            Business
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/politics">
            Politics
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/opinion">
            Opinion
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/science">
            Science
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/health">
            Health
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/style">
            Style
          </NavLink>
          <NavLink className="p-2 link-secondary" to="/travel">
            Travel
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
