import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { connect } from "redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const DetailArticle = (props) => {
  const [detail, setDetail] = useState({});
  const [blogger, setBlogger] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState(0);

  const [fakeLike, setFakeLike] = useState(false);

  const capitalizeFirstLetter = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  };

  const slug = props.match.params.id; // get slug

  useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/articles/detail/${slug}`,
          config
        );
        setDetail(res.data);
        setBlogger(res.data.blogger);
        setLikes(res.data.likes);
        // setComments(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.match.params.id]);

  return (
    <main className="container">
      <div className="breadcrumb">
        <Link className="breadcrumb__home" to="/">
          BloQuote
        </Link>
        <Link className="breadcrumb__home" to={`/${detail.categories}`}>
          {capitalizeFirstLetter(detail.categories)}
        </Link>
        <p className="breadcrumb__title">{detail.title}</p>
      </div>
      <hr />
      <div className="detail__blogger">
        <div className="detail__blogger__personal">
          <img
            src={blogger.user_photo}
            alt="image"
            className="detail__blogger__image image__2"
          />
          <p className="detail__blogger__name">
            {capitalizeFirstLetter(blogger.first_name)}
          </p>
          <p className="detail__blogger__name">
            {capitalizeFirstLetter(blogger.last_name)}
          </p>
        </div>
      </div>

      <div className="article">
        <div className="row">
          <div className="col-sm-9">
            <i className="abstract">{detail.abstract}</i>
            <hr />

            <div className="content">
              {detail.photo_main && (
                <img
                  src={detail.photo_main}
                  alt=""
                  className="content__photo"
                />
              )}

              <div className="content__content">{detail.content}</div>

              <div className="row">
                <div className="col-sm-12">
                  {detail.photo_1 && (
                    <img
                      src={detail.photo_1}
                      alt=""
                      className="content__photo"
                    />
                  )}
                </div>
              </div>
              <div className="col-sm-12">
                {detail.photo_2 && (
                  <img src={detail.photo_2} alt="" className="content__photo" />
                )}
              </div>
            </div>

            <div className="like__comments">
              <button
                onClick={() => setFakeLike(!fakeLike)}
                className={`btn btn-sm btn-outline-${
                  fakeLike ? "primary" : "secondary"
                }`}
              >
                Likes: {fakeLike ? likes.length + 1 : likes.length}
              </button>
              <p>{comments.length} comments</p>
            </div>

            <form className="auth__form comment__form" onSubmit={(e) => e}>
              <div className="auth__form__group">
                <textarea
                  className="auth__form__input margin__post__button"
                  type="text"
                  placeholder="Share Opinion here...."
                  name="comment"
                  // value={email}
                  // onChange={(e) => onChange(e)}
                  required
                  cols="70"
                  rows="3"
                ></textarea>
              </div>

              <button className="auth__form__button margin__post__button">
                Post
              </button>
            </form>
          </div>

          <div className="col-sm-3">
            <div className="related">
              <h3>Related Articles</h3>
              <ol>
                <li>Article 1</li>
                <li>Article 2</li>
                <li>Article 3</li>
                <li>Article 4</li>
                <li>Article 5</li>
              </ol>

              <h3>Articles by {blogger.first_name}</h3>
              <ol>
                <li>Article 1</li>
                <li>Article 2</li>
                <li>Article 3</li>
                <li>Article 4</li>
                <li>Article 5</li>
              </ol>
            </div>
          </div>
        </div>

        <hr />
        <div className="comments"></div>
      </div>
    </main>
  );
};

export default DetailArticle;
