import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Navbar, Collapse } from "reactstrap";
// import styled from "styled-components";

const Footer = () => {
  return (
    <Navbar fixed="bottom" expand="md">
      <Collapse navbar>
      <Row >
        <p className="footer1">&copy; 2022 bit-Picker.com &trade;</p>
      </Row>
      </Collapse>
    </Navbar>
  );
};

export default Footer;