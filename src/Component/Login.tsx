import React from "react";
import { useState, useEffect } from "react";
import APIURL from "../Helpers/environments";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

type LoginProps = {
  updateToken: (e: string) => void;
};

type LoginState = {
  email: string;
  password: string;
  // sessionToken: any;
};

class Login extends React.Component<LoginProps, LoginState> { 
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // sessionToken: "",
    };
  }
  
  handleSubmit = async () => {
    try {
    let errorCode: number | string;
    console.log(this.state.email, this.state.password);
    console.log(APIURL);


      const login = await fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
              user: {
                email: this.state.email,
                password: this.state.password,
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              // "Accept": "*",
            }),
          })

      // console.log(signup.json());
      const data = await login.json();
      console.log(data);
    
      console.log(data.sessionToken);
      this.props.updateToken(data.sessionToken);
      // if (condition) {

      // } else {

      // }
    } catch (error) {
      console.log(error);
    }
  };

  // handleSubmit = () => {
  //   console.log("login handle");
  //   console.log(this.state.email, this.state.password);
  //   fetch("http://localhost:5001/users/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       users: {
  //         email: this.state.email,
  //         password: this.state.password,
  //       },
  //     }),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(this.props.update);
  //       this.props.update(data.sessionToken);
  //     });
  // };

  render() {
    console.log("login render");
    return (
      <div>
        <h3>Login</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormGroup floating>
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;