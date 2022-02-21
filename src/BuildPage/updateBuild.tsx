import APIURL from "../Helpers/environments";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type UpdateBuildProps = {
    id: number;
    sessionToken: string;
    editUpdateBuild: string;
    fetchBuild: () => void;
};

type UpdateBuildState = {
    editId: number;
    editName: string;
    editDescription: string;
    editComplete: boolean;
    editTotalPrice: number;
};

// const navigate = useNavigate();

class BuildUpdate extends React.Component<UpdateBuildProps, UpdateBuildState> {
    constructor(props: UpdateBuildProps) {
        super(props);
        this.state = {
            editId: 0,
            editName: "",
            editDescription: "",
            editComplete: false,
            editTotalPrice: 0,
        };
    }


    
    // handleSubmit = () => {
    //     console.log("handleSubmit",            
    //         this.state.editName,
    //         this.state.editDescription,
    //         this.state.editComplete,
    //         this.state.editTotalPrice,
            
    //     );

    updateBuild = () => {
        fetch(`${APIURL}/build/update/${this.props.editUpdateBuild.id}`, {
            method: "PUT",
            body: JSON.stringify({
                buildList: {
                    name: this.state.editName,
                    description: this.state.editDescription,
                    complete: this.state.editComplete,
                    totalPrice: this.state.editTotalPrice,
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
                this.props.fetchBuild();
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.setState({
            editId: +this.props.editUpdateBuild,
        });
    }

    componentWillUnmount() {
        this.setState({
            editId: 0,
        });
    }

    render(    ) {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Update Build</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name"></Label>
                            <Input                                 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Build Name"
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
                            <Label for="totalPrice"></Label>
                            <Input
                                type="number"
                                name="totalPrice"
                                id="totalPrice"
                                placeholder="Total Price"
                                onChange={(e) => {
                                    this.setState({
                                        editTotalPrice: +e.target.value,
                                    });
                                    console.log(this.state.editTotalPrice);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row xs="2">
                                <Col sm>
                            <Label for="complete">Complete</Label>
                            <Input
                                type="checkbox"
                                name="complete"
                                id="complete"
                                onChange={(e) => {
                                    this.setState({
                                        editComplete: e.target.checked,
                                    });
                                }}                                
                            />
                            </Col>
                            </Row>
                        </FormGroup>
                        <Button onClick={this.updateBuild}>Submit</Button>
                        <Button type="submit">Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}


export default BuildUpdate;