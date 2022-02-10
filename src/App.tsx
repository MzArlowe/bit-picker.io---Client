import React from 'react';
import './App.css';
import NavBar from './Component/NavBar';
import Auth from './PartsPage/Auth';
import LandingPage from './PartsPage/createBit';
import Header from './Component/Header';
import Footer from './Component/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header /> 
      {/* <NavBar // does not need to be on splash page
        clickLogout={() => {}}
        tokenUpdate={() => {}}
      /> */}
      <Auth tokenUpdate={
        console.log("Hello")
      } />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
