import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar'; 
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/ChangePassword';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './pages/Footer';
import { NavBar } from './pages/NavBar';
import Contact from './components/Contact';
import DetailedProject from './pages/DetailedProject';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './privateRoutes/PrivateRoute';
// import { DonateNowButton } from './DonateNowButton';


// import Test from './test/test';
import { FundRaise } from './components/fundRaise';
import PromptForm from './components/Chatbot';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [showPromptForm, setShowPromptForm] = useState(false);

  const handleButtonClick = () => {
    setShowPromptForm(!showPromptForm);
  };


  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={isLoggedIn ? <HomePage /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/detailedProject' element={<DetailedProject/>} />
        <Route path='/fundRaise' element={
          <PrivateRoute><FundRaise/></PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute>
            <Dashboard />
      
          </PrivateRoute>}/>
      </Routes>
      <Footer />
      {/* <Test/> */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {/* PromptForm appears to the left of the button */}
        {showPromptForm && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            right: '100%',
            marginRight: '10px', // Adjust spacing as needed
            width: '300px', // Adjust width as needed
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1001
          }}>
            <PromptForm />
          </div>
        )}
        
        {/* Sticky button */}
        <button 
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            zIndex: 1000
          }} 
          onClick={handleButtonClick}
        >
          Bot
        </button>
      </div>
    </div>
  );
};

export default App;