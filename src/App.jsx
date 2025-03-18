  import { useEffect } from "react";
  import React from "react";
  import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
  import AuthForm from "./Component/Pages/Authform";
  import Home from "./Component/Home/Home"; 
  import Profile from "./Component/Pages/Profile";
  import AuthContext from "./store/auth-context"; 
  import Header from "./Component/Header/Header";
  import Welcome from "./Component/Pages/Welcome";
  import "bootstrap/dist/css/bootstrap.min.css";
  import ForgetPassword from "./Component/Pages/ForgetPassword";
  import AddExpense from "./Component/Expense/AddExpense";
  import { useSelector } from "react-redux";
  
  function App() {

    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

    useEffect(() => {
      document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    }, [isDarkMode]);
    return (
      
        <Router>
           <div className={isDarkMode ? "dark-mode" : "light-mode"}>
          <Header />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/add-expense" element={<AddExpense />}/>
          </Routes>
          </div>
        </Router>
     
    );
  }
  
  export default App;
  

