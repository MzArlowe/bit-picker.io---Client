import React from 'react';
import CreateBuild from './';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    token: string;
    clickLogout: any;
    tokenUpdate: any;
};

export interface Build {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: number;
}

class BuildIndex extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            build: [],
            hasError: false, // set to true if there is an error
            updateActive: false,
            editBuild: {},
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
    }

    componentDidMount = () => {
        this.fetchBuild();
    }

    fetchBuild = () => {
        console.log("fetch Builds", this.props.token);
        fetch(`${APIURL}/build/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.tokenUpdate}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    build: data
                })
            });
    };

    editUpdateBuild = (build: Build) => {
        this.setState({
            editBuild: build,
        });
        console.log(this.state.editBuild)
    };

    updateOn = () => {
        this.setState({
            updateActive: true,
        });
    };

    updateOff = () => { //This is a 
        this.setState({
            updateActive: false,
        });
    };
    
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