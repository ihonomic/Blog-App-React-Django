import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { delete_user, update_user } from "../actions/profile";
import CSRFToken from "../components/CSRFToken";
import { useState, useEffect } from "react";

const DashBoard = ({ auth, logout, update_user, delete_user }) => {
  const [formdata, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    country: "",
    bio: "",
  });

  const { first_name, last_name, phone, city, country, bio } = formdata;

  const onChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    update_user(first_name, last_name, phone, city, country, bio);
  };

  return (
    <div className="container">
      <h1>
        Welcome, {auth.first_name} {auth.last_name}
      </h1>
      <Link
        className="btn 
        btn-sm btn-outline-secondary 
        logout__button"
        onClick={logout}
        to="#"
      >
        Logout
      </Link>
      <hr />
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-sm-6">
              <img
                src={auth.user_photo}
                alt=""
                className="img-fluid img-thumbnail rounded"
              />
              <i>{auth.bio}</i>
            </div>
            <div className="col-sm-6">
              <h3>Bio data:</h3>
              <h6>First Name: {auth.first_name}</h6>
              <h6>Last Name: {auth.last_name}</h6>
              <h6>Email: {auth.email}</h6>
              <h6>Phone: {auth.phone}</h6>
              <h6>City: {auth.city}</h6>
              <h6>Country: {auth.country}</h6>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <h3>Summary of Account</h3>
          <hr />
          <h6>Number of Articles written: 0</h6>
          <h6>Number of Articles read: 0</h6>
          <h6>Saved Articles: 0</h6>
          <h6>Rating: 1</h6>
        </div>
      </div>
      <hr />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <CSRFToken />

            <div className="form-group">
              <label htmlFor="" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="first_name"
                value={first_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="city"
                value={city}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label">
                Country:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="country"
                value={country}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Bio:
              </label>
              <textarea
                className="form-control"
                placeholder=""
                name="bio"
                value={bio}
                onChange={(e) => onChange(e)}
                cols="70"
                rows="3"
                maxLength="190"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <button className="btn btn-secondary mt-3" typeof="submit">
          Update Profile
        </button>
      </form>
      <p>Deactivate my acccount? </p>{" "}
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => delete_user()}
      >
        Yes
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, update_user, delete_user })(
  DashBoard
);
