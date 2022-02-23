import React, { ErrorInfo } from 'react';
import CreateBuild from './createBuild';
// import BuildUpdate from './updateBuild';
// import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card, CardBody, CardTitle, CardText, ButtonGroup } from 'reactstrap';
import APIURL from '../Helpers/environments';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

type BuildIndexProps = {
    sessionToken: string;
    buildId: string;
    // updateBuild: string;
    // setUpdateBuild: (updateBuild: string) => void;
    setBuildId: (buildId: string) => void;
    createBuild: string;
    setCreateBuild: (createBuild: string) => void;
    buildArray: Build[];
    setBuildArray: (buildArray: Build[]) => void;
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
                    <hr ></hr>
                    {/* <Row>
                            <Col sm="3" md={{ size: 6, offset: 3 }}> */}
                    <CardBody>
                        <div key={idx}>
                            <CardTitle>
                                <h3>{build.name}</h3>
                                <p>{build.description}</p>
                                <p>{build.totalPrice}</p>
                                <p>{build.Complete}</p>
                            </CardTitle>

                            <CardText>

                            </CardText>
                            <ButtonGroup>
                                <button className="btn-link">
                                <Link to={`/bit/all/${build.id}`}>View Parts</Link>
                                </button>
                                <button className="btn-link">
                                <Link to={`/bit/create/${build.id}`}>Add Parts</Link>
                                </button>
                                {/* <Button onClick={() => this.deleteBit(build.id.toString())}>Delete</Button> */}
                                {/* <Button onClick={() => this.createBit(build)}>Create Bit</Button> */}
                            </ButtonGroup>
                        </div>
                    </CardBody>

                    {/* /* </Col>
                        </Row> */}

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

    // editUpdateBuild = (build: Build) => {
    //     this.setState({
    //         editBuild: build,
    //     });
    //     console.log(this.state.editBuild)
    // };

    // updateOn = () => {
    //     this.setState({
    //         updateActive: true,
    //     });
    // };

    // updateOff = () => {
    //     this.setState({
    //         updateActive: false,
    //     });
    // };

    updateBuild = (build: Build) => {
        console.log(build);
        fetch(`${APIURL}"/build/update/:buildId"`, {
            method: 'PUT',
            body: JSON.stringify(build),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })

        })

            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    editBuild: data.build.id
                })
                this.fetchBuild();
            })

            .catch((err) => { console.log('Catch Error', err) })
    };

    deleteBuild = (buildId: string) => {
        console.log(buildId);
        fetch(`${APIURL}/build/${buildId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((data) => {
                console.log(data);
                this.fetchBuild();
            })
            .catch((err) => { console.log('Catch Error', err) })
    };

    render() {
        console.log("BuildIndex render");
        console.log(this.state);
        return (
            <div>
                <Container>
                    <CreateBuild
                        sessionToken={this.props.sessionToken}
                        setBuildId={this.props.setBuildId}
                        createBuild={this.props.createBuild}
                        setCreateBuild={this.props.setCreateBuild}
                        fetchBuild={this.fetchBuild}
                    />

                    <div className="build-card-container">
                        <h2>Current Builds</h2>
                        {this.buildMap()}
                    </div>
                </Container>
            </div>
        );
    }
}

export default BuildIndex;