import React from 'react';
import UpdateBit from './updateBit';
import reactstrap, { Button } from 'reactstrap';
import APIURL from '../Helpers/environments';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps {
    sessionToken: string;
}

interface IState {
    data: Array<any>;
}

export default class ViewAllParts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
        }
    }


    getFetch = () => {
        const id = window.location.pathname.split("/")[3];
        fetch(`${APIURL}/parts/getall/${id}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.sessionToken}`,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            this.setState({
                data: data.parts
            });
        }
        );
    }

    componentDidMount(): void {
        this.getFetch();
    }

    deleteBit = (id: number) => {
        // const myId = window.location.pathname.split("/")[4];
        // console.log(myId);
        fetch(`${APIURL}/parts/delete/${id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                this.getFetch()
                // window.location.pathname=`/bit/all/`;
                // ${myId}`;
            })
            .catch((err) => console.log(err));
    };

    render() {
        console.log("this.state.data", this.state.data);
        return (
            <div>
                <h1>View All Parts</h1>
                <hr ></hr>
                {this.state.data.length > 0 && this.state.data.map((part: any) => {
                    return (
                        <div key={part.id}>
                            <h3>{part.name}</h3>
                            <p>{part.description}</p>
                            <p>{part.url}</p>
                            <p>{part.price}</p>
                            <button className="btn-link">
                                <Link to={`/bit/update/${part.id}`}>Update Part</Link>
                            </button>
                            <Button onClick={() => this.deleteBit(part.id)}>Delete</Button>
                            <button className="btn-link">
                                {/* <Link to={`/bit/delete/${part.id}`}>Delete Part</Link> */}
                            </button>
                            <button type="submit">Reserve</button>
                        </div>

                    )
                })}
            </div>
        );
    }
}
