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
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBuild from "./BuildPage/createBuild";
import APIURL from './Helpers/environments';

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

  const deleteBuild = () => {
    fetch(`${APIURL}/build/delete/${buildId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken,
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setBuildId("");
      });
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
          </header>
          <header className="Main-Body">
            <div>
              <BrowserRouter>
                <div>
                  <NavBar
                    // clickLogout={() => {}}
                    clearToken={
                      clearToken
                    } />
                </div>
                <Routes>
                  {
                    sessionToken &&
                    <Route path="/" element={
                      <div>
                        <h3>
                          Welcome to bitPicker!
                        </h3>
                        <hr />
                        <p>
                          Please select a build or hit the Create New Build Button to begin.
                        </p>
                        {/* Create Build Button */}
                        <div className="create-build-button">
                          <Button
                            color="primary"
                            onClick={() => {
                              setCreateBuild("createBuild");
                            }}
                          >
                            Create New Build
                          </Button>
                        </div>
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
                  {
                    <Route path="/build/:buildId" element={
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

                      } />
                    } />
                  }
                </Routes>
              </BrowserRouter>
            </div>
          </header>
          <footer className="footer">
            <div>
              <Footer />
            </div>
          </footer>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default App;
