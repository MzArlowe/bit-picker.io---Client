import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavItem,
  Button,
  NavbarToggler,
  Collapse,
} from "reactstrap";

interface NavProps {
  clickLogout: () => void;
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

  componentDidMount = () => {}
    
    render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    return (
      <div>
        <Navbar
          color="light"
          expand="md"
          light
        >
          <NavbarBrand href="/">
            BIT-PICKER
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() { }} />
          <Collapse navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <div className="nav-link">
                <Link to="/">
                  Home
                  </Link>
                </div>
              </NavItem>
              <NavItem>
                <NavLink href="https://https://github.com/MzArlowe/bit-picker.io---Client">
                  My GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown
                inNavbar
                nav
              >
                <DropdownToggle
                  caret
                  nav
                >
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <div className="dropdown-item">
                  <Link to="/build">New Build</Link>
                  </div>
                  </DropdownItem>
                  <DropdownItem>
                    About
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    User Profile (WIP)
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/* <NavItem> */}
            {/* <NavLink href="/login">Login</NavLink> */}
            <Button onClick={() => this.props.clearToken()}>Logout</Button>
            
            {/* </NavItem> */}
          </Collapse>
        </Navbar>
      </div>

      //FOR REFERENCE
      // <Navbar color="faded" light expand="md">
      //   <NavbarBrand></NavbarBrand>
      //   <NavbarToggler size="sm" />
      //   <Collapse navbar>
      //     <Nav className="ms-auto" navbar>
      //       <NavItem>
      //         <Link to="/">Home</Link>

      //       </NavItem>
      //       <NavItem>
      //         <Link to="/build">New Build</Link>

      //       </NavItem>
      //       <NavItem>
      //       <Button onClick={this.props.clearToken}>Logout</Button>
      //       </NavItem>
      //     </Nav>
      //   </Collapse>
      // </Navbar>
    );
  }
}

export default NavBar;