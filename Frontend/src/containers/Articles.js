import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

const A = (props) => {
  const [articles, setArticles] = useState([]);

  const path = props.match.params.id; // get path

  const body = JSON.stringify({
    category: path,
  });

  console.log("category", path);

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
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/articles/category`,
          body,
          config
        );
        setArticles(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [path]);

  const getArticles = () => {
    let card = [];
    let result = [];

    articles.map((article) => {
      return card.push(
        <BlogCard
          key={article.id}
          title={article.title}
          abstract={article.abstract}
          slug={article.slug}
          photo_main={article.photo_main}
          categories={article.categories}
          created_at={article.created_at}
        />
      );
    });

    // Put Each Card into HTML
    for (let i = 0; i < articles.length; i++) {
      result.push(
        <div key={i} className="col-md-6">
          {card[i] ? card[i] : null}
        </div>
      );
    }
    return result;
  };

  return (
    <Fragment>
      <Helmet>
        <title>BloQuote - {path}</title>
      </Helmet>

      <section className="container">
        <div>
          <div className=" row mb-2">{getArticles()}</div>
        </div>
      </section>
    </Fragment>
  );
};

export default A;
