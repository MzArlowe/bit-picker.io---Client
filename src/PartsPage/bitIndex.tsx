import React from 'react';
import { ErrorInfo } from 'react';
import CreateBit from './createBit';
import GetBit from './getBit';
import UpdateBit from './updateBit';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface BitIndexProps {
    sessionToken: string;
    bitId: string;
    setBitId: (bitId: string) => void;
    createBit: string;
    setCreateBit: (createBit: string) => void;
    fetch: () => void;
};

export interface BitIndexState {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
    updateActive: boolean;
    bit: Bit;
    editBit: Bit[];
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
            bit: {
                id: 0,
                name: "",
                description: "",
                url: "",
                price: 0,
            },
            editBit:[]
        };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    componentDidMount = () => {
        this.props.fetch();
    }

    editUpdateBit = (bit: Bit) => {
        this.setState({
            bit: bit,
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
                // const bitFilter = this.state.editBit.filter((curBit: Bit) => {
                //     return curBit.id !== bit.id;
                // })
                // this.setState({
                //     bit: bitFilter
                // })
                this.props.fetch();
            })
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
                    bit: {
                        id: 0,
                        name: "",
                        description: "",
                        url: "",
                        price: 0,
                    }
                })
            })
    }

    render() {
        console.log("BitIndex render");
        console.log(this.state)
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <h1>Update</h1>
                        <CreateBit 
                        sessionToken={this.props.sessionToken} 
                        fetchBit={this.props.fetch}
                        setBitId={this.props.setBitId}
                        createBit={this.props.createBit} 
                        setCreateBit={this.props.setCreateBit} />

                        <GetBit 
                        sessionToken={this.props.sessionToken} 
                        bitId={this.props.bitId} 
                        setBitId={this.props.setBitId} 
                        fetchBit={this.props.fetch} />

                        <UpdateBit 
                        sessionToken={this.props.sessionToken}
                        updateBit={this.editUpdateBit}
                        updateOff={this.updateOff}
                        editBit={this.state.editBit}
                        bit={this.state.bit}
                        fetch={this.props.fetch}                                    
                        />
                    </Col>
                        <Button onClick={() => {
                            this.props.sessionToken
                        }}>Add a Bit</Button>
                </Row>
                <Row>
                    <Col md="6">
                        <ul>
                            {this.state.editBit.map((bit) => {
                                return (
                                    <li key={bit.id}>
                                        <h3>{bit.name}</h3>
                                        <p>{bit.description}</p>
                                        <p>{bit.url}</p>
                                        <p>{bit.price}</p>
                                        {/* <Button onClick={() => {
                                            this.editUpdateBit(bit);
                                        }}>Edit</Button>
                                        <Button onClick={() => {
                                            this.deleteBit(bit);
                                        }}>Delete</Button> */}
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BitIndex;