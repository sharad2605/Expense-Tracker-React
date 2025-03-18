import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import { useContext } from "react";
// import AuthContext from "../../store/auth-context";  
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import {authActions } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";




const Authform = () => {
  // const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

console.log("Redux Token after Login:", token);
  

  
  
  const reset = function() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleAuth = (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_APP_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_APP_KEY}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        console.log(isLogin ? "User logged in!" : "User signed up!");
        
        dispatch(authActions.login({ token: data.idToken, email: data.email }));
        console.log("Token received:", data.idToken);
        console.log("Dispatched Login Action:", { token: data.idToken, email: data.email });
        if(!isLogin)
          {
            alert("Account created successfully,Now Login to continue");
          }  
        //reset the form
        reset();
        {isLogin && navigate("/home")};
      
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {!isLogin && ( // Confirm Password field only for Signup
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" variant="warning"  className="btn btn-primary w-100">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <br />
        <button variant="Warning"
            className="btn btn-link"
            onClick={() => navigate("/forget-password")}
          >
            {isLogin && "Forget Password?"}
          </button>

        <p className="text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button variant="Warning"
            className="btn btn-link"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authform;
