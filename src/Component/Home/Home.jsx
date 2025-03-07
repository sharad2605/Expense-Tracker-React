import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && (
        <p>
          Your Profile is incomplete.{" "}
          <Link to="/profile">Complete now</Link>
        </p>
      )}
    </>
  );
};

export default Home;
