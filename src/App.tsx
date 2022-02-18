import React from "react";
import { useState, useEffect } from "react";
import Logo from "./Assets/Transparent-Logo-Text02.png";
import './App.css';
import NavBar from "./Component/NavBar";
import BuildIndex from "./BuildPage/BuildIndex";
import Auth from './Component/Auth';
import Footer from './Component/Footer';
import Loading from './Component/Loading';
import { BrowserRouter, Router, Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIURL from './Helpers/environments';

const App: React.FunctionComponent = () => {
  const [loadingGif, setLoadingGif] = useState(true)
  const [sessionToken, setSessionToken] = useState("");
  const [createBuild, setCreateBuild] = useState<string>("");
  const [buildId, setBuildId] = useState<string>("");

  useEffect(() => {
    setTimeout(() => { setLoadingGif(false) }, 3000)
  }, []);

  const navigate = useNavigate();

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
    navigate(`/`);
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
                <Auth
                  updateToken={updateToken}
                  clearToken={clearToken} />
              </div>
            }
          </header>
          <div className="Main-Body">
            <div>

              {sessionToken &&
                <NavBar
                  clickLogout={clearToken}
                  clearToken={clearToken}

                />}
              <Routes>
                {sessionToken &&
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
                            navigate(`/build`);
                          }}
                        >
                          Create New Build
                        </Button>
                      </div>
                    </div>
                  } />
                }
                {
                <Route path="/build" element={
                  <BuildIndex
                    sessionToken={
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
                } />}
                {/* {
                    <Route path="/build/:buildId" element={
                      <BitIndex 
                      sessionToken={
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
                  } */}
              </Routes>
              {/* </BrowserRouter> */}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default App;
