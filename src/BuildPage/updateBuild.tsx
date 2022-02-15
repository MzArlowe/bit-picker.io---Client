import APIURL from "../Helpers/environments";
import React from "react";
import { Button, Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = { //Props is the type of the props that are passed into the component
    sessionToken: string;
    fetch: () => void;
    updateOff: () => void;
};

class BuildUpdate extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            Complete: false,
            totalPrice: 0,
            modal: false,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("handleSubmit", this.state.name, this.state.description, this.state.Complete, this.state.totalPrice);

        fetch(`${APIURL}/build`, {
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                Complete: this.state.Complete,
                totalPrice: this.state.totalPrice,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetch();
            });
            // .then((buildData) => { //BuildData is the data from the server
            //     console.log("buildData", buildData);
            //     this.setState({
            //         id: buildData.id,
    };

    handleChange = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Update Build</ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={(e) => {e.preventDefault(); this.handleSubmit(e);}}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={(e) => {this.setState({name: e.target.value,});}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => {this.setState({description: e.target.value,});}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Complete">Complete</Label>
                            <Input
                                type="text"
                                name="Complete"
                                id="Complete"
                                placeholder="Complete"
                                onChange={(e) => {this.setState({Complete: e.target.value,});}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="totalPrice">Total Price</Label>
                            <Input
                                type="text"
                                name="totalPrice"
                                id="totalPrice"
                                placeholder="Total Price"
                                onChange={(e) => {this.setState({totalPrice: e.target.value,});}}
                            />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default BuildUpdate;