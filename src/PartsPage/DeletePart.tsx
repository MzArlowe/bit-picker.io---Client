import React from "react";
import { Link } from "react-router-dom";

interface IProps {
    sessionToken: string;
}

interface IState {
    delete: boolean;
}

export default class DeleteBit extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            delete: false
        }
    }

    componentDidMount() {
        const id = window.location.pathname.split("/")[3];
        fetch(`http://localhost:3000/parts/delete/${id}`, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.setState({
                    delete: true
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Bit {
                    this.state.delete ? "deleted" : "is pending deletion"
                }</h1>
            </div>
        );
    }
}