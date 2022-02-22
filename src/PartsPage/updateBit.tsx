import React from "react";
import APIURL from '../Helpers/environments';
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

type UpdateBitProps = {
    sessionToken: string;
    
};

type UpdateBitState = {
    editId: string;
    editName: string;
    editDescription: string;
    editUrl: string;
    editPrice: number;
    buildId: string;
};

// const navigate = useNavigate();

class BitUpdate extends React.Component<UpdateBitProps, UpdateBitState> {
    constructor(props: UpdateBitProps) {
        super(props);
        this.state = {
            editId: window.location.pathname.split("/")[3],
            editName: "",
            editDescription: "",
            editUrl: "",
            editPrice: 0,
            buildId: "",
        };
    }

    handleSubmit = () => {
        console.log("handleSubmit",
            this.state.editId,
            this.state.editName,
            this.state.editDescription,
            this.state.editUrl,
            this.state.editPrice,
        );
        this.updateBit();

    };

    updateBit = () => {
        fetch(`${APIURL}/parts/update/${this.state.editId}`, {
            method: "PUT",
            body: JSON.stringify({
                part: {
                    id: this.state.editId,
                    name: this.state.editName,
                    description: this.state.editDescription,
                    complete: this.state.editUrl,
                    price: this.state.editPrice,
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
                window.location.pathname=`/bit/all/${this.state.buildId}`;
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        fetch(`${APIURL}/parts/${this.state.editId}`, {
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
                    editId: data.part.id,
                    editName: data.part.name,
                    editDescription: data.part.description,
                    editUrl: data.part.complete,
                    editPrice: data.part.price,
                    buildId: data.part.buildId,
                });
            })
            .catch((err) => console.log(err));
    }
    
    render() {
        console.log(this.state.editId)
        return (
            <Modal isOpen={true}>
                <ModalHeader>Update Part</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSubmit()
                    }}>

                        <FormGroup>
                            <Label for="name"></Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Part Name"
                                onChange={(e) => {
                                    this.setState({
                                        editName: e.target.value,
                                    });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description"></Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => {
                                    this.setState({
                                        editDescription: e.target.value,
                                    });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url"></Label>
                            <Input
                                type="text"
                                name="url"
                                id="url"
                                placeholder="URL"
                                onChange={(e) => 
                                    this.setState({
                                        editUrl: e.target.value,
                                    })
                                
                                }
                                value={this.state.editUrl}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url"></Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price"
                                onChange={(e) => {
                                    this.setState({
                                        editPrice: parseInt(e.target.value),
                                    });
                                    console.log(this.state.editPrice);
                                }}
                            />
                        </FormGroup>
                        {/* <Button onClick={this.updateBit}>Submit</Button> */}
                        <Button type="submit">Update</Button>
                        </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default BitUpdate;