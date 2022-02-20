import React from "react";
import { useState, useEffect } from "react";
import Logo from "./Assets/Transparent-Logo-Text02.png";
import './App.css';
import NavBar from "./Component/NavBar";
import BuildIndex from "./BuildPage/BuildIndex";
import UpdateBuild from "./BuildPage/updateBuild";
import BitIndex from "./PartsPage/bitIndex";
import Auth from './Component/Auth';
import Footer from './Component/Footer';
import Loading from './Component/Loading';
// import Build from "./BuildPage/createBuild";
import { Build } from "./BuildPage/BuildIndex";
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardText, ButtonGroup } from "reactstrap";
import { Router, Routes, Route, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIURL from './Helpers/environments';

const App: React.FunctionComponent = () => {
  const [loadingGif, setLoadingGif] = useState(true)
  const [sessionToken, setSessionToken] = useState("");
  const [createBuild, setCreateBuild] = useState<string>("");
  const [buildId, setBuildId] = useState<string>("");
  // const [fetchBuild, setFetchBuild] = useState<string>("");
  // const [fetchBit, setFetchBit] = useState<string>("");
  // const [bitId, setBitId] = useState<string>("");
  // const [createBit, setCreateBit] = useState<string>("");
  // const [updateBit, setUpdateBit] = useState<string>("");
  // const [updateBuild, setUpdateBuild] = useState<string>("");
  // const [updateActive, setUpdateActive] = useState<boolean>(false);
  const [buildArray, setBuildArray] = useState<Build[]>([]);

  useEffect(() => {
    setTimeout(() => { setLoadingGif(false) }, 3000)
  }, []);

  useEffect(() => {
    if (sessionToken) {
      fetchBuild();
    }
  }, [sessionToken]);

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

  const deleteBuild = (delbId: string) => {
    fetch(`${APIURL}/build/delete/${delbId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionToken}`,
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        fetchBuild();
      });
  };

  const fetchBuild = () => {
    console.log("fetch Builds", sessionToken);
    fetch(`${APIURL}/build`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      })
    })
      .then((res) => {
        // console.log(res)
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setBuildArray(data.builds);
      })
      .catch((err) => { console.log('Catch Error', err) })
  };



  return (
    console.log("App render"),
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
                      <h2>
                        Welcome to bit-Picker!
                      </h2>
                      <hr />
                      
                      <p>Ever needed a place to organize and save the components of your PC build?</p>
                      <p>Need recommendations for a new GPU or Processor?</p>
                      <p>Need to find a new motherboard and case that will fit that NvIDIA 3090?</p>
                      <br />
                      <p>
                        Create New Build Button to begin.
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
                        <hr />
                        <br />
                      </div>
                    </div>
                  } />
                }
                {<Route path="/build" element={
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
                {/* {<Route path="/build/:buildId" element={
                        <BitIndex
                          sessionToken={
                            sessionToken
                          } bitId={
                            buildId
                          } setBitId={
                            setBuildId
                          } createBit={
                            createBuild
                          } setCreateBit={
                            setCreateBuild
                          } />
                      } />} */}
                <Route path="/build/update/:buildId" element={
                  <UpdateBuild
                    sessionToken={
                      sessionToken
                    } editUpdateBuild={
                      buildId
                    } fetchBuild={
                      fetchBuild
                    }
                  />
                } />
              </Routes>
              {sessionToken &&
                <Container>
                  <Row xs="3">
                    <Col sm="3" md={{ size: 6, offset: 3 }}
                    >
                    <>
                      <div className="build-card-container">
                        <h3>Current Builds</h3>
                        {buildArray.map((build, index) => { //map through the buildArray
                          return (
                            <Card key={build.id}>
                              <CardBody>
                                <CardTitle
                                  className="build-name"
                                  color="gray"
                                >{build.name}</CardTitle>
                                <CardText>{build.description}</CardText>
                                <div className="build-card-buttons">
                                  <ButtonGroup>
                                  <Button
                                    size="md"
                                    color="primary"
                                    onClick={() => {
                                      navigate(`/build/${build.id}`);
                                    }}
                                  >View Build
                                  </Button>
                                  <Button
                                    size="md"
                                    color="primary"
                                    onClick={() => {
                                      navigate(`/build/update/${build.id}`);

                                    }}
                                  >Update
                                  </Button>
                                  <Button
                                    size="md"
                                    color="danger"
                                    onClick={() => {
                                      setBuildId(build.id.toString());
                                      deleteBuild(build.id.toString());
                                    }}
                                  >Delete Build
                                  </Button>
                                </ButtonGroup>
                                </div>
                              </CardBody>
                            </Card>
                          )
                        }
                        )}
                      </div>
                    </>
                    </Col>
                  </Row>
                </Container>
              }
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
