import React from 'react';
import './App.css';
import NavBar from './Component/NavBar';
import Auth from './Pages/Auth';
import LandingPage from './Pages/landingPage';
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Auth tokenUpdate={
        console.log("Hello")
      } />
      <LandingPage />
      <NavBar
        clickLogout={() => {}}
        tokenUpdate={() => {}}
      />
      <Footer />
    </div>
  );
}

export default App;
