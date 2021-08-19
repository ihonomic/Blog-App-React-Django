import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Fragment>
      <Helmet>
        <title>BloQuote - Ops! Page Not found</title>
        <meta name="" content="" />
      </Helmet>
      <div className="notfound">
        <h1 className="notfound__heading">404 Not Found</h1>
        <p className="notfound__paragraph">
          The requested link doesn't exist on{" "}
          <span className="bloquote__brand1">Blo</span>
          <span className="bloquote__brand2">Quote</span>
        </p>

        <Link className="notfound__home" to="/">
          Return Home
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
