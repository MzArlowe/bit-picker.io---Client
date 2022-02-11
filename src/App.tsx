import React from "react";
import { useState, useEffect } from "react";
import Logo from "./Assets/Transparent-Logo-Text02.png";
import './App.css';
import NavBar from './Component/NavBar';
import Auth from './PartsPage/Auth';
import LandingPage from './PartsPage/createBit';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Loading from './Component/Loading';
import BuildIndex from "./BuildPage/buildIndex";
// import BitIndex from './PartsPage/bitIndex';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FunctionComponent = () => {
    const [loadingGif, setLoadingGif] = useState(true)
    useEffect(() => {
      setTimeout(() => {setLoadingGif(false)}, 3000)}, []);
    
    const [sessionToken, setSessionToken] = useState("");
    
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setSessionToken(localStorage.getItem("token") || "");
      }
    })

    // if (localStorage.getItem("token")) {
    //   setSessionToken(localStorage.getItem("token"));
    // }
    const updateToken = (newToken: string) => {
      localStorage.setItem("token", newToken);
      setSessionToken(newToken);
      console.log(sessionToken);
    };
    const clearToken = () => {
      console.log("clearToken")
      localStorage.clear();
      setSessionToken("");
    };
    const protectedViews = () => {
      return sessionToken === localStorage.getItem("token") ? (
        <BuildIndex 
        token={sessionToken}
        clickLogout={clearToken}
        tokenUpdate={updateToken}        
        />
      ) : (
        <Auth tokenUpdate={updateToken} />
      );
    };

  return (
    <>
    {loadingGif === false ? (
    <div className="App"> 
      {protectedViews()}
      <header className="App-header" style={
        {
          backgroundColor: "blue",
          height: "100%",
          paddingBottom: "50px",
          }
          }>
        <img src={Logo} className="App-brand" alt="logo" />
      <div>
      <Header /> 
      {/* <NavBar // does not need to be on splash page
        clickLogout={() => {}}
        tokenUpdate={() => {}}
      /> */}
      <Auth tokenUpdate={
        console.log("Hello")
      }/></div>
      {/* <LandingPage /> */}
      <div>
      
      <Footer />
      </div>
      </header>
    </div>
    
    ) : (
      <Loading />
    )}
    </>
  );
}

export default App;
