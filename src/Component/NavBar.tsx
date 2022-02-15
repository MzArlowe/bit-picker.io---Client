import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavbarToggler,
  Collapse,
} from "reactstrap";

interface NavProps {
  // clickLogout: any;
  clearToken: () => void;
}

class NavBar extends React.Component<NavProps, any> {
  constructor(props: NavProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount = () => { };

  render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand>bitPicker</NavbarBrand>
          <NavbarToggler size="sm" />
          <Collapse navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Link to="/">Home</Link>
                
              </NavItem>
              <NavItem>
                <Link to="/build">New Build</Link>
               
              </NavItem>
              <NavItem>
              <Button onClick={this.props.clearToken}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;