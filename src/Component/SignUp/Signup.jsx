import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic (e.g., Firebase Authentication API)
    console.log("Signup with", email, password);
    let url;
      // Signup Logic
      url =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_APP_KEY}`;
    

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    ).then((res) => {
      if(res.ok) {
        return res.json();
        
        
      }else{
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if(data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          })
      }
    }).then((data) => {
    //   
    console.log("User has successfully signed up");
    }).catch((err) => {
      alert(err.message);
    });
}
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">

      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center">SignUp</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit" className="btn btn-primary w-100">
            Sign up
          </button>
        </form>
        <p className="text-center mt-3">
          Have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;