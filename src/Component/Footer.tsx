import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Nav, Collapse } from "reactstrap";
// import styled from "styled-components";

const Footer = () => {
  return (
    <div>
      <Row>
        <Nav className="col-sm-12" navbar>
          <div>
          <p className="footer1">&copy; 2022 bit-Picker.com &trade;</p>
          </div>
        </Nav>
      </Row>
    </div>
  );
};

export default Footer;