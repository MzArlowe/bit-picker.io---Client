import React from "react";
import Logo from "./Assets/bplogo.jpg";
import './App.css';
import NavBar from './Component/NavBar';
import Auth from './PartsPage/Auth';
import LandingPage from './PartsPage/createBit';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Loading from './Component/Loading';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
    const [loadingGif, setLoadingGif] = useState(true)
    useEffect(() => {
      setTimeout(() => {setLoadingGif(false)}, 6000)}, []
      
      )
  return (
    <>
    {loadingGif === false ? (
    <div className="App">
        <img src={Logo} className="App-brand" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https//.com">
          Build Your PC Here!
          </a> */}
      <Header /> 
      {/* <NavBar // does not need to be on splash page
        clickLogout={() => {}}
        tokenUpdate={() => {}}
      /> */}
      <Auth tokenUpdate={
        console.log("Hello")
      }/>
      <LandingPage />
      <Footer />
    </div>
    ) : (
      <Loading />
    )}
    </>
  );
}

export default App;
