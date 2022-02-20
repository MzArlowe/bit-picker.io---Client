import React, { ErrorInfo } from 'react';
import CreateBuild from './createBuild';
import BuildUpdate from './updateBuild';
// import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, CardBody, CardTitle, CardText, ButtonGroup } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';

type BuildIndexProps = {
    sessionToken: string;
    buildId: string;
    // updateBuild: string;
    // setUpdateBuild: (updateBuild: string) => void;
    setBuildId: (buildId: string) => void;
    createBuild: string;
    setCreateBuild: (createBuild: string) => void;
};
type BuildIndexState = {
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

    buildMap = () => {
        return this.state.build.map((build: Build, idx: number) => {
            return (
                <div className="build-card">
                    <CardBody>
                    <div key={idx}>
                        <CardTitle>
                        <h3>{build.name}</h3></CardTitle>
                        <CardText>
                        <h3>{build.description}</h3>
                        <p>{build.Complete}</p>
                        <p>{build.totalPrice}</p>
                        </CardText>
                        <ButtonGroup>
                        <Button outline onClick={() => this.editUpdateBuild(build)}>Edit</Button>
                        <Button onClick={() => this.deleteBuild(build)}>Delete</Button>
                        <Button onClick={() => this.createBit(build)}>Create Bit</Button>
                        </ButtonGroup>
                        {/* <Button onClick={() => this.createBit(bit)}>Start Building</Button> */}
                        {/* <button onClick={() => this.editUpdateBuild(build)}>Edit</button>
                    <button onClick={() => this.createBit()}>Start Building</button>
                    <button onClick={() => this.deleteBuild(build)}>Delete</button> */}
                    </div>
                    </CardBody>
                </div>
            )
        })
    }

    fetchBuild = () => {
        console.log("fetch Builds", this.props.sessionToken);
        fetch(`${APIURL}/build`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    build: data.builds

                })
                console.log(this.state.build);
                this.buildMap()
            })
            .catch((err) => { console.log('Catch Error', err) })
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

    deleteBuild = (build: Build) => {
        fetch(`${APIURL}/build/${build.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.fetchBuild();
            });
    }

    render() {
        console.log("BuildIndex render");
        console.log(this.state);
        return (
            <div>
                <Container>
                    <Row xs="2"  >
                        <Col 
                        // md="6"
                        >
                            <CreateBuild
                                sessionToken={this.props.sessionToken}
                                setBuildId={this.props.setBuildId}
                                createBuild={this.props.createBuild}
                                setCreateBuild={this.props.setCreateBuild}
                                fetchBuild={this.fetchBuild}
                            />
                        </Col>

                        <Col
                        // md="6"
                        >
                            <div className="build-card-container">
                                <h2>Current Builds</h2>
                                {this.buildMap()}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* <Container>
                <>
                
                    {this.buildMap()}
                </div>
                </>
                </Container> */}
            </div>
        );
    }
}

export default BuildIndex;