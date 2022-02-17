import APIURL from "../Helpers/environments"
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type CreateBuildProps = {
    sessionToken: string;
    setBuildId: (buildId: string) => void;
    createBuild: string
    fetchBuild: (fetchBuild: string) => void;
};

type CreateBuildState = {
    id: number;
    name: string;
    description: string;
    complete: boolean;
    totalPrice: number;
}

class CreateBuild extends React.Component<CreateBuildProps, CreateBuildState> {
    constructor(props: CreateBuildProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            complete: false,
            totalPrice: 0,
        };
    }

    handleSubmit = () => {
        console.log("handleSubmit",
            this.state.name,
            this.state.description,
            this.state.complete,
            this.state.totalPrice,
        );

        fetch(`${APIURL}/build/create`, {
            method: "POST",
            body: JSON.stringify({
                buildList: {
                name: this.state.name,
                description: this.state.description,
                complete: this.state.complete,
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
                this.props.setBuildId(data.id); 
                this.props.fetchBuild("")  
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

    testType = (e: any) => {
        console.log('Target Value:', typeof e.target.value);
    }

    render() {
        return (
            <div>
                <h1>Build Info</h1>
                <Form inline onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>

                    <FormGroup>
                        <Label for="name"></Label>
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
                        <Label for="description"></Label>
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
                        <Label for="totalPrice"></Label>
                        <Input
                            type="text"
                            name="totalPrice"
                            id="totalPrice"
                            placeholder="Total Price"
                            // onChange={(e) => {
                            //     this.setState({ totalPrice: e.target.value, })
                            // }}
                            onChange={(e) => { this.testType(e); }}
                        > {" "}
                        </Input>
                    </FormGroup>

                    <Button onClick={() => { this.handleSubmit(); }}
                        > {" "}
                        </Button>
                    {/* </FormGroup> */}

                    <FormGroup>
                        <Label for="Complete">Complete?</Label>
                        <Input
                            type="checkbox"                              
                            name="Complete"                            
                            id="Complete"
                            placeholder="Complete"
                            checked={this.state.complete}
                            onChange={(e) => {
                                this.setState({ complete: !this.state.complete, });
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