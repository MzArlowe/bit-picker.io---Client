import APIURL from "../Helpers/environments";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type UpdateBuildProps = {
    id: string;
    sessionToken: string;
    editUpdateBuild: string;
    fetchBuild: () => void;
};

type UpdateBuildState = {
    editId: number;
    editName: string;
    editDescription: string;
    editComplete: boolean;
    editTotalPrice: number;
};

// const navigate = useNavigate();

class BuildUpdate extends React.Component<UpdateBuildProps, UpdateBuildState> {
    constructor(props: UpdateBuildProps) {
        super(props);
        this.state = {
            editId: 0,
            editName: "",
            editDescription: "",
            editComplete: false,
            editTotalPrice: 0,
        };
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("handleSubmit",
            this.state.editId,
            this.state.editName,
            this.state.editDescription,
            this.state.editComplete,
            this.state.editTotalPrice,
        );
        this.updateBuild();

    };

    updateBuild = () => {
        const myId = window.location.pathname.split("/")[3];
        console.log(myId);
        fetch(`${APIURL}/build/update/${myId}`, {
            method: "PUT",
            body: JSON.stringify({
                build: {
                    id: this.state.editId,
                    name: this.state.editName,
                    description: this.state.editDescription,
                    complete: this.state.editComplete,
                    totalPrice: this.state.editTotalPrice,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                window.location.pathname="/";
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.setState({
            editId: +this.props.editUpdateBuild,//if errors arise, look into parseInt
        });
    }

    componentWillUnmount() {
        this.setState({
            editId: 0,
        });
    }

    render() {
        console.log(this.props.id)
        return (
            <Modal isOpen={true}>
                <ModalHeader>Update Build</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name"></Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Build Name"
                                onChange={(e) => {
                                    this.setState({
                                        editName: e.target.value,
                                    });
                                }}
                            />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="description"></Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => {
                                    this.setState({
                                        editDescription: e.target.value,
                                    });
                                }}
                            />
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="totalPrice"></Label>
                            <Input
                                type="number"
                                name="totalPrice"
                                id="totalPrice"
                                placeholder="Total Price"
                                onChange={(e) => {
                                    this.setState({
                                        editTotalPrice: +e.target.value,
                                    });
                                    console.log(this.state.editTotalPrice);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row xs="2">
                                <Col sm>
                                    <Label for="complete">Complete</Label>
                                    <Input
                                        type="checkbox"
                                        name="complete"
                                        id="complete"
                                        onChange={(e) => {
                                            this.setState({
                                                editComplete: e.target.checked,
                                            });
                                        }}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        {/* <Button onClick={this.updateBuild}>Submit</Button> */}
                        <Button type="submit">Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}


export default BuildUpdate;