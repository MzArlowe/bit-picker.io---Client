import React from "react";
import APIURL from "../Helpers/environments";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type CreateBitProps = {
    sessionToken: string;
    fetchBit: () => void;
    updateOff: () => void;
    setBitId: (bit: any) => void;
    createBit: string;
    setCreateBit: (createBit: string) => void;

};

type CreateBitState = {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
};

class CreateBit extends React.Component<CreateBitProps, CreateBitState> {
    constructor(props: CreateBitProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            url: "",
            price: 0,
        };
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit", this.state.name, this.state.description, this.state.url, this.state.price);

        fetch(`${APIURL}/build/bit`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.setBitId(data.id.toString());
                this.props.setCreateBit("");
                this.props.fetchBit();
            });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as any);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        type="text"
                        name="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">url</Label>
                    <Input
                        type="text"
                        name="url"
                        id="url"
                        value={this.state.url}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        value={this.state.price}
                        onChange={this.handleChange} />
                </FormGroup>
                <Button type="submit">Submit</Button>
                </Form>
        );
    }
}

export default CreateBit;