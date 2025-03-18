import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';

const Header = () => {
  // const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/auth');
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
          {isAuth &&(
            <>
            <Link to="/add-expense" className="nav-link text-white">Add Expense</Link>
             (
              <Link to="/profile" className="nav-link text-white">Profile</Link>
            )
            <Button variant="warning" className="ms-2">
              <Link to="/auth" className="nav-link text-black" onClick={logoutHandler}>
                  Logout
              </Link>
            </Button>
            </>
          )}
          {!isAuth && (
              <Button variant="warning" className="ms-2">
                <Link to="/auth" className="nav-link text-black">
                  Login
                </Link>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
