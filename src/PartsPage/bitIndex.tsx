import React from 'react';
import { ErrorInfo } from 'react';
import CreateBit from './createBit';
import GetBit from './getBit';
import UpdateBit from './updateBit';
import { Container, Button, Row, Col, Card, CardBody, CardTitle, CardText, ButtonGroup } from 'reactstrap';
import APIURL from '../Helpers/environments';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

type BitIndexProps = {
    sessionToken: string;
    bitId: string;
    setBitId: (bitId: string) => void;
    createBit: string;
    setCreateBit: (createBit: string) => void;
    bitArray: Bit[];
    setBitArray: (bitArray: Bit[]) => void;
    updateBit: string;
    setUpdateBit: (updateBit: string) => void;
    fetch: () => void;
};

type BitIndexState = {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
    updateActive: boolean;
    bit: Bit[];
    editBit: Bit;
};

export interface Bit {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
};

class BitIndex extends React.Component<BitIndexProps, BitIndexState> {

    constructor(props: BitIndexProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            url: "",
            price: 0,
            updateActive: false,
            bit: [],
            editBit: {
                id: 0,
                name: "",
                description: "",
                url: "",
                price: 0
            }
        };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    componentDidMount = () => {
        // this.props.fetch();
    }

    bitMap = () => {
        return this.state.bit.map((build: Bit, idx: number) => {
            return (
                <div className="build-card">
                    {/* <Row>
                            <Col sm="3" md={{ size: 6, offset: 3 }}> */}
                    <CardBody>
                        <div key={idx}>
                            <CardTitle>
                                <h3>{build.name}</h3></CardTitle>
                            <CardText>
                                <p>{build.description}</p>
                                <p>{build.url}</p>
                                <p>{build.price}</p>
                            </CardText>
                            <ButtonGroup>
                                {/* <Link to={`/build/${build.id}`}>Test</Link> */}
                                {/* <Button onClick={() => this.updateBit(build)}>Edit Bit</Button>
                                <Button onClick={() => this.deleteBit(build.toString())}>Delete</Button>
                                <Button onClick={() => this.createBit(build)}>Add Component</Button> */}
                            </ButtonGroup>
                        </div>
                    </CardBody>

                    {/* /* </Col>
                        </Row> */}

                </div>
            )
        })
    }
    editUpdateBit = (bit: Bit) => {
        this.setState({
            updateActive: true,
        });
    }
    updateOn = () => {
        this.setState({
            updateActive: true,
        });
    }

    updateOff = () => {
        this.setState({
            updateActive: false,
        });
    }

    updateBit = (event: React.FormEvent<HTMLFormElement>, bit: Bit) => {
        event.preventDefault();
        console.log("updateBit", bit);
        fetch(`${APIURL}/bit/update`, {
            method: 'PUT',
            body: JSON.stringify({
                bit: {
                    id: bit.id,
                    name: bit.name,
                    description: bit.description,
                    url: bit.url,
                    price: bit.price,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())

            .then((data) => {
                console.log(data);
                this.setState({
                    updateActive: false,
                    // bit: {
                    //     // id: 0,
                    //     name: "",
                    //     description: "",
                    //     url: "",
                    //     price: 0,
                    // }
                })
            })
    }

    deleteBit = (bit: Bit) => {
        console.log("deleteBit", bit);
        fetch(`${APIURL}/bit/delete/${bit.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })

        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    bit: [],
                })
            }

            )
    }

    render() {
        console.log("BitIndex render");
        console.log(this.state)
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <h1>Update</h1>
                        {/* <UpdateBit
                            updateBit={this.props.updateBit}
                            setUpdateBit={this.props.setUpdateBit}
                            updateActive={this.state.updateActive}
                            updateOff={this.updateOff}
                            updateOn={this.updateOn}
                            updateBit={this.updateBit}
                            bitArray={this.props.bitArray}
                            setBitArray={this.props.setBitArray}
                        /> */}
                    </Col>
                    <Button onClick={() => {
                        this.props.sessionToken
                    }}>Add a Bit</Button>
                </Row>
                <Row>
                    <Col md="6">
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default BitIndex;