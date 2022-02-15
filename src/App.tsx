import React from "react";
import { useState, useEffect } from "react";
import Logo from "./Assets/Transparent-Logo-Text02.png";
import './App.css';
import NavBar from "./Component/NavBar";
import BuildIndex from "./BuildPage/BuildIndex";
// import Header from "./Component/Header";
import Auth from './Component/Auth';
import Footer from './Component/Footer';
import Loading from './Component/Loading';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// export interface AppProps {
//   createBuild: string;
//   setCreateBuild: (createBuild: string) => void;
// }

const App: React.FunctionComponent = () => {
  const [loadingGif, setLoadingGif] = useState(true)
  const [sessionToken, setSessionToken] = useState("");
  const [createBuild, setCreateBuild] = useState<string>("");
  const [buildId, setBuildId] = useState<string>("");
  useEffect(() => {
    setTimeout(() => { setLoadingGif(false) }, 3000)
  }, []);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") || "");
    }
  })

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

  return (
    <>
      {loadingGif === false ? (
        <div className="App">
          <header className="App-header">
            {!sessionToken &&
              <div>
                <img src={Logo} className="App-brand" alt="logo" />
                <Auth updateToken={
                  updateToken
                } />
              </div>
            }
            <BrowserRouter>
              <NavBar
                // clickLogout={() => {}}
                clearToken={
                  clearToken
                } />
              <Routes>
                {
                  sessionToken &&
                <Route path="/" element={
                  <div>
                    <h3>
                      Welcome to bitPicker!
                    </h3>
                  </div>
                } />
                }
                <Route path="/build" element={
                  <BuildIndex sessionToken={
                    sessionToken
                  } buildId={
                    buildId
                  } setBuildId={
                    setBuildId
                  } createBuild={
                    createBuild
                  } setCreateBuild={
                    setCreateBuild
                  }
                  />
                } />
              </Routes>
            </BrowserRouter>
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
