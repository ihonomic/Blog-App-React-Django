import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const SubLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Alert />
      </div>
      {children}
    </div>
  );
};

export default SubLayout;
