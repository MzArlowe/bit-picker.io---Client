import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from '../helpers/environments';

interface Props {
    tokenUpdate: any;
};

interface State {
    build: Build[];
    hasError: boolean;
};

export interface Build {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: number;
}

class BuildIndex extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            build: [],
            hasError: false, // set to true if there is an error
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
    }

    componentDidMount = () => {
        fetch(`${APIURL}/build/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.tokenUpdate}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    build: data
                })
            })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <Button onClick={() => {}
                        }>Build
                        </Button>
                    </Col>
                    <Col md="6">
                        <Button onClick={
                            () => { }}>Parts
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BuildIndex;