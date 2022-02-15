import React, { ErrorInfo } from 'react';
import CreateBuild from './createBuild';
import UpdateBuild from './updateBuild';
import { Container, Row, Col } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface BuildIndexProps {
    sessionToken: string;
    buildId: string;
    setBuildId: (buildId: string) => void;
    createBuild: string
    setCreateBuild: (createBuild: string) => void;
};
export interface BuildIndexState {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: number;
    updateActive: boolean;
    build: Build[];
    editBuild: Build;
}

export interface Build {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: number;
}

class BuildIndex extends React.Component<BuildIndexProps, BuildIndexState> {

    constructor(props: BuildIndexProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            Complete: false,
            totalPrice: 0,
            updateActive: false,
            build: [],
            editBuild: {
                id: 0,
                name: "",
                description: "",
                Complete: false,
                totalPrice: 0,
            }
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    componentDidMount = () => {
        this.fetchBuild();
    }

    fetchBuild = () => {
        console.log("fetch Builds", this.props.sessionToken);
        fetch(`${APIURL}/build`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
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

    updateOff = () => {
        this.setState({
            updateActive: false,
        });
    };

    render() {
        console.log("BuildIndex render");
        console.log(this.state);
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="12">
                            <CreateBuild
                                sessionToken={this.props.sessionToken}
                                fetch={this.fetchBuild}
                            />


                            {this.state.updateActive ? (
                                <UpdateBuild
                                    sessionToken={this.props.sessionToken}
                                    fetch={this.fetchBuild}
                                    updateOff={this.updateOff}
                                // editBuild={this.state.editBuild}
                                />

                            ) : (
                                <></>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default BuildIndex;