
  import React from "react";
  import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
  import AuthForm from "./Component/Pages/Authform";
  import Home from "./Component/Home/Home"; 
  import Profile from "./Component/Pages/Profile";
  import AuthContext from "./store/auth-context"; 
  import Header from "./Component/Header/Header";
  import Welcome from "./Component/Pages/Welcome";
  
  function App() {
    return (
      
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
     
    );
  }
  
  export default App;
  

