import React from 'react';
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
interface IProps {
    sessionToken: string;
}

interface IState {
    name: string;
    description: string;
    url: string;
    price: number;
    isOpen: boolean;
}

export default class CreatePart extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            name: "",
            description: "",
            url: "",
            price: 0,
            isOpen: true

        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    create = () => {
        const myId = window.location.pathname.split("/")[3];
        console.log(myId);
        fetch(`http://localhost:3000/parts/create`, {
            method: "POST",
            body: JSON.stringify({
                part: {
                    name: this.state.name,
                    description: this.state.description,
                    url: this.state.url,
                    price: this.state.price,
                    buildId: myId,
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
                window.location.pathname = `/bit/all/${myId}`;
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="container-md">
                <h1>Add Your Component</h1>
                <hr ></hr>
                <div
                    style={{
                        display: "flex",
                        height: 100,
                        overflow: 'hidden',
                        padding: '0',
                        width: 100,
                        justifyContent: 'center',
                    }}
                >

                    <Dropdown
                        isOpen={this.state.isOpen} toggle={this.toggle}>
                        {/* // toggle={function noRefCheck(){}} */}
                        <DropdownToggle caret>
                            Part Type
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Case
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Processor
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Motherboard
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Graphics Card
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Memory
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Storage
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Power Supply
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Fans
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck() { }}>
                                Extras
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.create();
                }}>
                    <FormGroup>
                        <Label for="name"></Label>
                        <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={(e) => {
                            this.setState({ name: e.target.value });
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"></Label>
                        <Input type="text" name="description" id="description" placeholder="Description" value={this.state.description} onChange={(e) => {
                            this.setState({ description: e.target.value });
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url"></Label>
                        <Input type="text" name="url" id="url" placeholder="URL" value={this.state.url} onChange={(e) => {
                            this.setState({ url: e.target.value });
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price"></Label>
                        <Input type="number" name="price" id="price" placeholder="Price" value={this.state.price} onChange={(e) => {
                            this.setState({ price: parseInt(e.target.value) });
                        }} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}