import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

const Featuredcard = (props) => {
  return (
    <Fragment>
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">{props.title}</h1>
          <p className="lead my-3">{props.abstract}</p>
          <p className="lead mb-0">
            <Link
              to={`/articles/detail/${props.slug}`}
              className="text-white fw-bold"
            >
              Continue reading...
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Featuredcard.propTypes = {
  title: Proptypes.string.isRequired,
  abstract: Proptypes.string.isRequired,
  slug: Proptypes.string.isRequired,
};

export default Featuredcard;
