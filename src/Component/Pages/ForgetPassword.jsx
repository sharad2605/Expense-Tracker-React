import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ForgetPassword    = () => { 

    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const forgetPasswordHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${import.meta.env.VITE_APP_KEY}`, {
              method: "POST",
              body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: email,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            console.log(data);
            if (data.error) {
              throw new Error(data.error.message);
            }
            alert("Password reset link sent to your email");
          } catch (error) {
            console.log(error);
            alert(error.message);
          }finally {
            setLoading(false);
            setEmail('');
          }
        
        }
      
    return(
        <>
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" , height: "200px"}}>
        <h4 className="text-center"> Forget Password</h4>
        <form  onSubmit={forgetPasswordHandler}>
            <label className="form-label">Enter the Email which you have used to register</label>
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
        
          <Button type="submit" variant="warning" disabled={loading}  className="btn btn-primary w-100">
          {loading ? 'Loading...' : 'Send Reset Link'}
          </Button>
        </form>
        
       

        
      </div>
    </div>
        </>
    )
}

export default ForgetPassword;