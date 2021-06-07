import React from 'react';
import axios from 'axios';
//import '../Student/Addstudent.css'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pCode: '',
            firstName: '',
            lastName: '',
            email: '',
            isActive: ''
        }
    }
    

    //CreateUser = () => {
    //    const headers = {
    //        "access-control-allow-orgin": "*",
    //        "Content-type": "application/json;charset=UTF-8"
    //    }
    //    console.log(this.state);
    //    axios.post('https://localhost:44356/api/users/AddorUpdateUser', {
    //        Pcode: this.state.pCode, FirstName: this.state.firstName,
    //        LastName: this.state.lastName, Email: this.state.email, IsActive: this.state.isActive
    //    },
    //        { headers: headers })
    //        .then(json => {
    //            if (json.data.Status === 'Success') {
    //                console.log(json.data.Status);
    //                alert("Data Save Successfully");
    //                this.props.history.push('/userlist')
    //            }
    //            else {
    //                alert('Data not Saved');
    //                debugger;
    //                this.props.history.push('/userlist')
    //            }
    //        })
    //}

    CreateUser = () => {
        const headers = {
            "access-control-allow-orgin": "*",
            "Content-type": "application/json;charset=UTF-8"
        }
        axios.post('https://localhost:44356/api/users/AddorUpdateUser/', {
            Pcode: this.state.pCode, FirstName: this.state.firstName,
            LastName: this.state.lastName, Email: this.state.email, IsActive: this.state.isActive
        },
            { headers: headers })
            .then(json => {
                if (json.data.Status === 'Success') {
                    console.log(json.data.Status);
                    alert("Data Save Successfully");
                    this.props.history.push('/Studentlist')
                }
                else {
                    alert('Data not Saved');
                    debugger;
                    this.props.history.push('/Studentlist')
                }
            })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Enter User Informations</h4>
                <Form className="form">
                    <Col>
                        <FormGroup row>
                            <Label for="pCode" sm={2}>PCode</Label>
                            <Col sm={10}>
                                <Input type="text" name="pCode" onChange={this.handleChange} value={this.state.pCode} placeholder="Enter PCode" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="firstName" sm={2}>First Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="Enter First Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={2}>LastName</Label>
                            <Col sm={10}>
                                <Input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Enter LastName" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="IsActive" sm={2}>Status</Label>
                            <Col sm={10}>
                                {/* <Input type="text" name="IsActive" onChange={this.handleChange} value={this.state.IsActive} placeholder="Enter Address" />*/}
                                <select className="form-control" data-val="true" name="isActive" defaultValue={this.state.isActive} onChange={this.handleChange}>
                                    <option value="">-- Select Status --</option>
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <button type="button" onClick={this.CreateUser} className="btn btn-success">Submit</button>
                            </Col>
                            <Col sm={1}>
                                <Button color="danger">Cancel</Button>{' '}
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }

}
export default AddUser;

