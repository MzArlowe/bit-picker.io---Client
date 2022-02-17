import APIURL from "../Helpers/environments";
import React from "react";
import { Button, Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type UpdateBuildProps = {
    sessionToken: string;
    fetch: () => void;
    updateOff: () => void;
};

type UpdateBuildState = {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: any;
};

class BuildUpdate extends React.Component<UpdateBuildProps, UpdateBuildState> {
    constructor(props: UpdateBuildProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            Complete: false,
            totalPrice: 0,
        };
    }

    handleSubmit = () => {
        console.log("handleSubmit",
            this.state.name,
            this.state.description,
            this.state.Complete,
            this.state.totalPrice,
        );

        fetch(`${APIURL}/build/update`, {
            method: "PUT",
            body: JSON.stringify({
                buildList: {
                    name: this.state.name,
                    description: this.state.description,
                    complete: this.state.Complete,
                    totalPrice: this.state.totalPrice,
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
                this.props.fetch();
                this.props.updateOff();
            });
    };

    componentDidMount() {
        this.setState({
            id: 0,
        });
    }

    componentWillUnmount() {
        this.setState({
            id: 0,
        });
    }

        render() {
            return (
                <Modal isOpen={true}>
                    <ModalHeader>Update Build</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Build Name"
                                    onChange={(e) => {
                                        this.setState({
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    onChange={(e) => {
                                        this.setState({
                                            description: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="totalPrice">Total Price</Label>
                                <Input
                                    type="number"
                                    name="totalPrice"
                                    id="totalPrice"
                                    placeholder="Total Price"
                                    onChange={(e) => {
                                        this.setState({
                                            totalPrice: e.target.value,
                                        });
                                        console.log(this.state.totalPrice);
                                    }}
                                />
                            </FormGroup>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }
    }


export default BuildUpdate;