import { checkAuth } from "../actions/auth";
import { connect } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children, checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, []);

  return <div>{children}</div>;
};

export default connect(null, { checkAuth })(Layout);
