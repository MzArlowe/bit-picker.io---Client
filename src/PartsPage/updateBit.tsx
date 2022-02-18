import React from "react";
import APIURL from '../Helpers/environments';
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Bit } from './bitIndex';

type updateBitProps = {
    sessionToken: string;
    updateBit: (e: any) => void;
    fetch: () => void;
    updateOff: () => void;
    editBit: Bit[];
    bit: Bit;
};

type State = {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
}

class UpdateBit extends React.Component<updateBitProps, State> {
    constructor(props: updateBitProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            url: "",
            price: 0,
        };
    }

    componentDidMount() {
        this.setState({
            id: 0,
        });
    }

    handleSubmit = () => {
        console.log("handleSubmit",
            this.state.name,
            this.state.description,
            this.state.url,
            this.state.price,
        );

        fetch(`${APIURL}/bit/update`, {
            method: "PUT",
            body: JSON.stringify({
                bitList: {
                    name: this.state.name,
                    description: this.state.description,
                    url: this.state.url,
                    price: this.state.price,
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

    handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        } as Pick<State, keyof State>);

    };

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Update your Post</ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={this.handleSubmit}>
                    </Form>
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input type="text"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input type="text"
                                name="description"
                                id="description"
                                value={this.state.description}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">URL:</Label>
                            <Input type="text"
                                name="url"
                                id="url"
                                value={this.state.url}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price:</Label>
                            <Input type="number"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default UpdateBit;