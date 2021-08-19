import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import FeaturedCard from "../components/FeaturedCard";
import BlogCard from "../components/BlogCard";
import axios from "axios";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/articles/")
      .then((res) => {
        setFeatured(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const capitalizeFirstLetter = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  };

  const AllFeatured = () => {
    let display = [];
    let result = [];

    featured.map((feature) => {
      feature.map((f) => {
        return display.push(
          <FeaturedCard
            key={f.id}
            title={capitalizeFirstLetter(f.title)}
            abstract={f.abstract}
            slug={f.slug}
          />
        );
      });
    });

    // Put Card into HTML
    for (let i = 0; i < 1; i++) {
      result.push(<div key={i}>{display[i]}</div>);
    }
    return result;
  };

  const BlogFeatured = () => {
    let display = [];
    let result = [];

    featured.map((feature) => {
      feature.map((f) => {
        return display.push(
          <BlogCard
            key={f.id}
            title={capitalizeFirstLetter(f.title)}
            abstract={f.abstract}
            slug={f.slug}
            photo_main={f.photo_main}
            categories={f.categories}
            created_at={f.created_at}
          />
        );
      });
    });

    // Put Card into HTML
    for (let i = 0; i < featured.length; i += 2) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{display[i]}</div>

          <div className="col-md-6">
            {display[i + 1] ? display[i + 1] : null}
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <Fragment>
      <Helmet>
        <title>
          BloQuote - Home of all Blogs, Real Life articles. Amazing Experience
        </title>
        <meta
          name="BloQuote"
          content="  Home of all Blogs, Real Life articles. Amazing Experience"
        />
      </Helmet>
      <section className="container">
        <div className="feature__card">{AllFeatured()}</div>
        <div className="blog__card">{BlogFeatured()}</div>
      </section>
    </Fragment>
  );
};

export default Home;
