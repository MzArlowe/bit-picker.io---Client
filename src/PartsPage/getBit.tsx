import APIURL from "../Helpers/environments";
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type GetBitProps = {
    sessionToken: string;
    bitId: string;
    setBitId: (bitId: string) => void;
    fetchBit: () => void;
};

type FetchBitState = {
    id: number;
    name: string;
    description: string;
    url: string;
    price: number;
};

export class GetBit extends React.Component<GetBitProps, FetchBitState> {
    constructor(props: GetBitProps) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            url: "",
            price: 0,
        };
    }

    handleSubmit = () => {
        console.log("handleSubmit", 
        this.state.name, 
        this.state.description, 
        this.state.url, 
        this.state.price
        );

        fetch(`${APIURL}/build/bit`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetchBit();
            });
    }

    getAllBit = () => {
        console.log("GetAllBit", this.props.sessionToken);
        fetch(`${APIURL}/build/bit`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.props.fetchBit();
            });
    }

    render() {
        return (
            <div>
                <Button onClick={this.getAllBit}>Get All Bit</Button>
                <Button onClick={this.handleSubmit}>Get Bit</Button>
            </div>
        );
    }
}

export default GetBit;



// export default GetBit;