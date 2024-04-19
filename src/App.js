
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import {auth} from '../src/firebase';
import History from './components/History/History';
import Header from './components/Header/Header';

function App() {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        
      } else setUserName("");
    });
  }, []);
  return (
    <div className="App">
         <Header name={userName }/>
         <Router>
         <Routes>
    
         <Route path="/history" element={<History/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
       
 
    </Routes>
    </Router>
  </div>
  );
}

export default App;
