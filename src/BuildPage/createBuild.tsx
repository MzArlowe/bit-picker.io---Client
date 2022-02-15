import APIUR from "../Helpers/environments"
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type CreateBuildProps = {
    sessionToken: string;
    setBuildId: (buildId: string) => void;
    createBuild: (createBuild: string) => void;
    fetchBuild: (fetchBuild: string) => void;
};

type CreateBuildState = {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: any;
}

class CreateBuild extends React.Component<CreateBuildProps, CreateBuildState> {
    constructor(props: CreateBuildProps) {
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

        fetch(`${APIUR}/user/build`, {
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
                this.props.setBuildId(data.id);   
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
            <div>
                <h2>Build Info</h2>
                <Form inline onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>
                    <FormGroup>
                        <Label for="name">Build Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Build Name"
                            onChange={(e) => {
                                this.setState({ name: e.target.value, });
                            }}
                        > {" "}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description"
                            onChange={(e) => {
                                this.setState({ description: e.target.value, });
                            }}
                        > {" "}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Complete">Complete?</Label>
                        <Input
                            type="checkbox"
                            name="Complete"
                            id="Complete"
                            placeholder="Complete"
                            checked={this.state.Complete}
                            onChange={(e) => {
                                this.setState({ Complete: !this.state.Complete, });
                            }}
                        > {" "}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalPrice">Total Price</Label>
                        <Input
                            type="text"
                            name="totalPrice"
                            id="totalPrice"
                            placeholder="Total Price"
                            onChange={(e) => {
                                this.setState({ totalPrice: e.target.value, });
                            }}
                        > {" "}
                        </Input>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default CreateBuild;