import { useState, useEffect } from "react";
import axios from "axios";

const CSRFToken = () => {
  const [csrftoken, setCsrfToken] = useState("");

  //1. FUNCTION GENERATING CSRFToken
  const getToken = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/bloggers/csrf`);
      } catch (error) {
        console.log("Couldn't fetch CSRFToken from server");
      }
    };
    fetchData();
    setCsrfToken(getToken("csrftoken"));
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};
export default CSRFToken;
