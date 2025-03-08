import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
   }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="fw-bold nav-link text-warning">
            Expense Tracker
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link to="/about" className="nav-link text-white">About</Link> */}
            {authCtx.isLoggedIn && (
              <Link to="/profile" className="nav-link text-white">Profile</Link>
            )}
            <Button variant="warning" className="ms-2">
              <Link to="/auth" className="nav-link text-black" onClick={logoutHandler}>
                {authCtx.isLoggedIn ? "Logout" : "Login"}
              </Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
