import APIUR from "../Helpers/environments"
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type GetBuildProps = {
    sessionToken: string;
    fetchBuild: () => void;
};

type FetchBuildState = {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice : number;
}

// This will be the GET for my Builds

export class GetBuild extends React.Component<GetBuildProps, FetchBuildState> {
    constructor(props: GetBuildProps) {
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

        fetch(`${APIUR}/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetchBuild();
            });
    }

    getAllBuild = () => {
        console.log("GetAllBuild", this.props.sessionToken);
        fetch(`${APIUR}/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetchBuild();
            });
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={(e) => {
                                this.setState({ name: e.target.value });
                            }
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="complete">Complete</Label>
                        <Input type="checkbox" name="complete" id="complete" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalPrice">Total Price</Label>
                        <Input type="text" name="totalPrice" id="totalPrice" placeholder="Total Price" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default GetBuild;
