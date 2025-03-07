
  import React from "react";
  import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
  import AuthForm from "./Component/Pages/Authform";
  import Home from "./Component/Home/Home"; // Dummy screen after login
  import AuthContext from "./store/auth-context"; // AuthContext ko use karenge
  
  function App() {
    return (
      
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/auth" />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
     
    );
  }
  
  export default App;
  

