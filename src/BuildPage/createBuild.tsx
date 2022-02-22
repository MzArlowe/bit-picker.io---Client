import APIURL from "../Helpers/environments"
import React from "react";
import { Button, Row, Col, Card, CardTitle, CardText, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type CreateBuildProps = {
    sessionToken: string;
    setBuildId: (buildId: string) => void;
    createBuild: string
    setCreateBuild: (createBuild: string) => void;
    fetchBuild: (fetchBuild: string) => void;
};

type CreateBuildState = {
    id: number;
    name: string;
    description: string;
    complete: boolean;
    totalPrice: (string | number);
}

class CreateBuild extends React.Component<CreateBuildProps, CreateBuildState> {
    constructor(props: CreateBuildProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            complete: false,
            totalPrice: "",
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
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.props.setBuildId(data.id);
                this.props.fetchBuild("")
            });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        } as any);
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
    //trying to convert a string to a number

    myPrice = (e: any) => {
        console.log('Target Value:', typeof e.target.value);
    }
    // deleteBuild = () => {
    //     fetch(`${APIURL}/build/delete`, {
    //         method: "DELETE",
    //         body: JSON.stringify({
    //             buildList: {
    //                 id: this.state.id,
    //             }
    //         }),
    //         headers: new Headers({
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${this.props.sessionToken}`,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("data", data);
    //             this.props.fetchBuild("")
    //         });
    // }
    // myTotalPrice = Number(this.state.totalPrice);

    render() {
        return (
            <div>
                <h1>Create Build</h1>
                <hr ></hr>
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
                                        type="number"
                                        name="totalPrice"
                                        id="totalPrice"
                                        placeholder="Total Price"
                                        onChange={(e) => {
                                            this.setState({ totalPrice: e.target.value, })
                                        }}
                                    // onChange={(e) => { this.testType(e); }}
                                    > {" "}
                                    </Input>
                                </FormGroup>
                                <div className="complete-container">
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
                                </div>
                                <Button>Submit</Button>
                            </Form>
                    </div>
        );
    }
}

export default CreateBuild;