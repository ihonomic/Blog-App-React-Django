import { Fragment } from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const getNumbers = () => {
    let numbers = [];
    let itemsPerPage = props.itemsPerPage;
    let pageNumber = 1;

    let pageNumberLimit = Math.ceil(props.count / props.itemsPerPage);

    for (let i = 0; i < pageNumberLimit; i++) {
      const page = pageNumber;
      let style = "btn btn-outline-primary";
      let content = null;

      if (props.active === page) {
        style = "btn btn-outline-primary page-active";
        content = (
          <div key={i} className={style}>
            {pageNumber}
          </div>
        );
      } else {
        content = (
          <div key={i} className={style} onClick={() => props.visitPage(page)}>
            {pageNumber}
          </div>
        );
      }
      numbers.push(content);
      pageNumber++;
    }

    return numbers;
  };

  return (
    <div className="blog-pagination" aria-label="Pagination">
      <button
        className="btn btn-outline-primary pagination__number"
        onClick={() => props.previous()}
      >
        Previous
      </button>
      {getNumbers()}

      <button
        className="btn btn-outline-secondary pagination__number"
        onClick={() => props.next()}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  visitPage: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default Pagination;
