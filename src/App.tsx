import React from 'react';
import './App.css';
import NavBar from './Component/NavBar';
import Auth from './PartsPage/Auth';
import LandingPage from './PartsPage/createBit';
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar
        clickLogout={() => {}}
        tokenUpdate={() => {}}
      />
      <Auth tokenUpdate={
        console.log("Hello")
      } />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
