// import React from 'react';
// // import { Button, Container, Row, Col } from 'reactstrap';
// import APIURL from '../Helpers/environments';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface Props {
//     tokenUpdate: any;
// };

// interface State {
//     bit: Bit[];
//     hasError: boolean;
// };

// export interface Bit {
//     id: number;
//     name: string;
//     description: string;
//     url: string;
//     price: number;
// };

// class BitIndex extends React.Component<Props, State> {

//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             bit: [],
//             hasError: false, // set to true if there is an error
//         };
//     }

//     componentDidCatch(error: any, errorInfo: any) {
//         console.log(error, errorInfo);
//     }

//     componentDidMount = () => {
//         fetch(`${APIURL}/bit/`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `${this.props.tokenUpdate}`//if this errors out, check the tokenUpdate in the props
//             })
//         }).then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 this.setState({
//                     bit: data
//                 })
//             })
//     }
//     render() {
//         return (""
//             // <Container>
//             //     <Row>
//             //         <Col md="6">
//             //             <Button onClick={() => {
//             //                 this.props.tokenUpdate
//             //             }}>Bit
//             //             </Button>
//             //         </Col>
//             //     </Row>
//             // </Container>
//         );
//     }
// }

// export default BitIndex;

export{}