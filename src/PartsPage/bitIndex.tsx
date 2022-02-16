import React from 'react';
import { ErrorInfo } from 'react';
import { useState, useEffect } from 'react';
import CreateBit from './PartsPage/createBit';
import GetBit from './PartsPage/getBit';
import UpdateBit from './PartsPage/updateBit';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface BitIndexProps {
    sessionToken: string;
    setBitId: (bitId: string) => void;
};

export interface BitIndexState {
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
                price: 0,
            }
        };
    }
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    }

    componentDidMount = () => {
        console.log("fetch Bits", this.props.sessionToken);
        fetch(`${APIURL}/bit/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`//if this errors out, check the tokenUpdate in the props
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    bit: data
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
                        <Button onClick={() => {
                            this.props.sessionToken
                        }}>Add a Bit
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BitIndex;