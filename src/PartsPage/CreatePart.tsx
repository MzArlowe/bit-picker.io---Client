import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
interface IProps {
    sessionToken: string;
}

interface IState {
    name: string;
    description: string;
    url: string;
    price: number;
}

export default class CreatePart extends React.Component <IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state={
            name: "",
            description: "",
            url: "",
            price: 0
        }
    }

    create = () => {
        const myId = window.location.pathname.split("/")[3];
        console.log(myId);
        fetch(`http://localhost:3000/parts/create`, {
            method: "POST",
            body: JSON.stringify({
                part: {
                    name: this.state.name,
                    description: this.state.description,
                    url: this.state.url,
                    price: this.state.price,
                    buildId: myId,
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
                window.location.pathname=`/bit/all/${myId}`;
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="container-md">
                <h1>Add Your Component</h1>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.create();
                }}>
                    <FormGroup>
                        <Label for="name"></Label>
                        <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={(e) => {
                            this.setState({name: e.target.value});
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"></Label>
                        <Input type="text" name="description" id="description" placeholder="Description" value={this.state.description} onChange={(e) => {
                            this.setState({description: e.target.value});
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url"></Label>
                        <Input type="text" name="url" id="url" placeholder="URL" value={this.state.url} onChange={(e) => {
                            this.setState({url: e.target.value});
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price"></Label>
                        <Input type="number" name="price" id="price" placeholder="Price" value={this.state.price} onChange={(e) => {
                            this.setState({price: parseInt(e.target.value)});
                        }} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}