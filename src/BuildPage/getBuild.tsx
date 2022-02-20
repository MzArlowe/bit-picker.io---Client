import APIURL from "../Helpers/environments"
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
    totalPrice: number;

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

        fetch(`${APIURL}/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
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
        fetch(`${APIURL}/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetchBuild();
            });
    }

    // const display = document.getElementById('builds');
    // for (i = 0; i = display?.childNodes.length; i++) {
    //     display.childNodes[i].remove();
    //     display.removeChild(display.childNodes[i]);

    // if (data.length === 0)
    //    let display = document.getElementById('builds');
    //    let header = document.createElement('h1');

    //    display.appendChild(header);
    //      header.innerHTML = "No Builds Found";
    //      header.setAttribute('class', 'no-builds');
    // } else {
    //     for(i = 0; i < DataTransfer.length; i++) {
    //         let display = document.getElementById('builds');
    //         let header = document.createElement('h1');
    //         let build = document.createElement('div');
    //         let name = document.createElement('p');
    //         let description = document.createElement('p');
    //         let Complete = document.createElement('p');
    //         let totalPrice = document.createElement('p');
    //         let edit = document.createElement('button');
    //         let delete = document.createElement('button');
    //         let start = document.createElement('button');

    // const displayBuilds = () => {
    //     return this.props.builds.map((build) => {
    //         return (
    //             <div key={build.id}>
    //                 <h3>{build.name}</h3>
    //                 <p>{build.description}</p>
    //                 <p>{build.complete}</p>
    //                 <p>{build.totalPrice}</p>
    //             </div>
    //         );
    //     })
    // .catch((error) => {
    //     console.log(error);
    // });

    //     }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name"
                            onChange={(e) => {
                                this.setState({ name: e.target.value });
                            }}
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
