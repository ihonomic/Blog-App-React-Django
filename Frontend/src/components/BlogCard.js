import { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogCard = (props) => {
  return (
    <Fragment>
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">
            {props.categories}
          </strong>
          <h3 className="mb-0">{props.title}</h3>
          <div className="mb-1 text-muted">{props.created_at}</div>
          <p className="card-text mb-auto">{props.abstract}</p>
          <Link
            to={`/articles/detail/${props.slug}`}
            className="stretched-link"
          >
            Continue reading
          </Link>
        </div>
        <div className="col-auto">
          <img src={props.photo_main} alt="" className="thumbnail__images" />
        </div>
      </div>
    </Fragment>
  );
};

BlogCard.propTypes = {
  categories: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  photo_main: PropTypes.string.isRequired,
};

export default BlogCard;
