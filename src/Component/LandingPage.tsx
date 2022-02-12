import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "./Header";
import NavBar from "./NavBar";
import APIURL from "../Helpers/environments";
import BuildIndex from "../BuildPage/buildIndex";
import BitIndex from "../PartsPage/bitIndex";
import Footer from "./Footer";
import Loading from "./Loading";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const LandingPage: React.FunctionComponent = () => {

  const [sessionToken, setSessionToken] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loadingGif, setLoadingGif] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") || "");
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") || "");
    }
  }, []);

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

  // const protectedViews = () => {
  //   return sessionToken === localStorage.getItem("token") ? (
  //     <BuildIndex
  //       token={sessionToken}
  //       clickLogout={clearToken}
  //       tokenUpdate={updateToken}
  //     />
  //   ) : (
  //     <Auth tokenUpdate={updateToken} />
  //   );
  // };

  return (
    <div>
      <Loading />
      <Header />
      <NavBar 
        clickLogout={() => {}}
        tokenUpdate={() => {}}/>
      {/* {protectedViews()} */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Welcome to BitPicker</h1>
            <p>
              BitPicker is a web application that allows users to create and
              manage their own builds.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul>
              <li>
                <strong>Create</strong> - Create a build with a name, description,
                and a list of components.
              </li>
              {/* <li><BuildIndex /></li> */}
              {/* <li><BitIndex /></li> */}
              <li>
                <strong>Read</strong> - View all builds and their components.
              </li>
              <li>
                <strong>Update</strong> - Update a build's name, description, or
                components.
              </li>
              <li>
                <strong>Delete</strong> - Delete a build.
              </li>
            </ul>
            <p>
              <strong>
                <a href="/auth/google">Sign in with Google</a>
              </strong>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;