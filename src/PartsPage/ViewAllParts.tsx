import React from 'react';
import UpdateBit from './updateBit';
import CreateBit from './createBit';
import { Button, ButtonGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
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
                <div className="create-btn">
                    {/* // Button that maps the create part for current build// */}
                    <ButtonGroup>
                        <button>
                        <Link to={`/bit/create/${window.location.pathname.split("/")[3]}`}>
                        Add Part</Link>
                        </button>
                        </ButtonGroup>
                            
                </div>
                {this.state.data.length > 0 && this.state.data.map((part: any) => {
                    return (
                        <div className='card-container'>
                        <Card>
                            <CardBody>
                                <div className='parts-card'>
                        <div key={part.id}>
                            <CardTitle>
                            <h2>{part.name}</h2>
                            </CardTitle>
                            <CardText>
                            <h5>{part.description}</h5>
                            <h5>{part.url}</h5>
                            <h4>{part.price}</h4>
                            </CardText>
                            </div>
                            <ButtonGroup>
                                <button className="btn-link">
                                    <Link to={`/bit/update/${part.id}`}>Update Part</Link>
                                </button>
                                {/* <Button onClick={() => this.deleteBit(part.id)}>Delete</Button> */}
                                <button className="btn-link">
                                    <Link to={`/bit/delete/${part.id}`}>Delete Part</Link>
                                </button>
                                <button type="submit">Reserve</button>
                            </ButtonGroup>                            
                        </div>
                        </CardBody>
                        </Card>
                        
                        </div>
                    )
                    
                })}
            </div>
        );
    }
}
