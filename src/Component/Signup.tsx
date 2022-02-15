import React from "react";
import APIURL from "../Helpers/environments";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  FormText,
  List,
} from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


type SignupProps = {
  updateToken: (e: string) => void;
};

type SignupState = {
  email: string;
  password: string;
  // role: string;
  message: string;
};

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // role: "user",
      message: "",
    };
  }
  componentDidMount = () => { };

  handleSubmit = async () => {
    let errorCode: number | string;
    console.log(this.state.email, this.state.password);
    console.log(APIURL);

    try {

      const signup = await fetch(`${APIURL}/user/register`, {
            method: "POST",
            body: JSON.stringify({
              // users: {
                email: this.state.email,
                password: this.state.password,
                // role: this.state.role,
              // }, 
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              // "Accept": "*",
            }),
          })
        
      // console.log(signup.json());
      const data = await signup.json();
          
      // if (condition) {
        
      // } else {
        
      // }

      // set state for session token
      this.props.updateToken(data.sessionToken);

    } catch (error) {
      console.log(error);
    }
  };


  validPassword = () => { //validates password through form validation: Currently not working
    console.log("valid password");
    return (
      this.state.password.length > 8 &&
      this.state.password.match(/[A-Z]/) !== null &&
      this.state.password.match(/[a-z]/) !== null &&
      this.state.password.match(/[0-9]/) !== null
    );
  };

  render() {
    return (
      <div>
        <h3 className="title">Signup</h3>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormGroup floating>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
              name="email"
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              name="password"
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <FormGroup floating>
            <Button type="submit" disabled={!this.validPassword()}>
              Sign Up
            </Button>
            <FormText>
              <List className="password-list">
                <ul>Minimum of 8 characters and</ul>
                <ul>must have at least 1 Number,</ul>
                <ul>1 Letter, and/or 1 Symbol.</ul>
                <br />
              </List>
            </FormText>
            <FormFeedback>
              {" "}
              {this.state.message !== "" ? <p>{this.state.message}</p> : ""}
            </FormFeedback>
          </FormGroup>{" "}
          <FormFeedback>
            {" "}
            {this.state.message !== "" ? (
              <p className="message">{this.state.message}</p>
            ) : (
              ""
            )}
          </FormFeedback>
        </Form>
      </div>
    );
  }
}

export default Signup;