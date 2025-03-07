import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  

  useEffect(() => {
    const idToken = localStorage.getItem("token");

    if (!idToken) {
      navigate("/authform");
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${import.meta.env.VITE_APP_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({ 
              idToken: idToken
             }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile!");

        const data = await response.json();
        if (data.users.length > 0) {
          setFullName(data.users[0].displayName || "");
          setPhotoUrl(data.users[0].photoUrl || "");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (idToken) fetchProfile();
  }, []);



  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const API_KEY = import.meta.env.VITE_APP_KEY;
    const idToken = localStorage.getItem("token"); // Get the stored token

    if (!idToken) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            displayName: fullName,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <h1 className="text-center">Welcome to your Profile ...!!!</h1>

    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Contact Details</h2>
        <form onSubmit={updateProfileHandler}>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Photo URL:</label>
            <input
              type="text"
              className="form-control"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update
          </button>
          <br />
          <br />
          <button type="button" className="btn btn-outline-danger w-100"  onClick={() => navigate("/home")}>Cancel</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Profile;
