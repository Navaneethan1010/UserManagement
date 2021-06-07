import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
//import '../User/Adduser.css'  
class Edit extends React.Component {  
    constructor(props) {  
        super(props)  
     
        this.onChangePcode = this.onChangePcode.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleChangeIsActive = this.handleChangeIsActive.bind(this);
    this.onSubmit = this.onSubmit.bind(this);  
  
         this.state = {  
             Pcode:'',
             FirstName: '',
             LastName: '',
             Email: '',
             IsActive: ''
  
        }  
    }  
  
    componentDidMount() {
      axios.get('https://localhost:44356/api/users/UserdetailById?id=' + this.props.match.params.id)
          .then(response => {
              console.log(response.data);
              this.setState({
                  PCode: response.data.pCode,
                  FirstName: response.data.firstName,
                  LastName: response.data.lastName,
                  Email: response.data.email,
                  IsActive: response.data.isActive=true?'1':'0'
               });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  

    onChangePcode(e) {
        this.setState({
            PCode: e.target.value
        });
    }
  onChangeFirstName(e) {  
    this.setState({  
        FirstName: e.target.value  
    });  
  }  
  onChangeLastName(e) {  
    this.setState({  
        LastName: e.target.value  
    });    
  }  
  onChangeEmail(e) {  
    this.setState({  
        Email: e.target.value  
    });  
}  
    handleChangeIsActive(e) {
        this.setState({            
            IsActive: e.target.value  
        });  
  }  
  
    onSubmit(e) {
    e.preventDefault();  
      const obj = {
          userId: this.props.match.params.userId,
          Pcode: this.state.Pcode,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email,
          IsActive: this.state.IsActive 
  
        };
        const headers = {
            "access-control-allow-orgin": "*",
            "Content-type": "application/json;charset=UTF-8"
        }
        axios.post('https://localhost:44356/api/users/AddorUpdateUser', {
            Pcode: this.state.pCode, FirstName: this.state.firstName,
            LastName: this.state.lastName, Email: this.state.email, IsActive: this.state.isActive
        },
            { headers: headers })
            .then(json => {
                if (json.data.Status === 'Success') {
                    console.log(json.data.Status);
                    alert("Data Save Successfully");
                    this.props.history.push('/userlist')
                }
                else {
                    alert('Data not Saved');
                    debugger;
                    this.props.history.push('/userlist')
                }
            })  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update User Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>
                        <FormGroup row>
                            <Label for="pCode" sm={2}>P Code</Label>
                            <Col sm={10}>
                                <Input type="text" name="PCode" value={this.state.PCode} onChange={this.onChangePcode}
                                    placeholder="Enter PCode" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>  
                            <Label for="firstName" sm={2}>First Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="FirstName" value={this.state.FirstName} onChange={this.onChangeFirstName}
                                placeholder="Enter First Name" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>
                            <Label for="lastName" sm={2}>Last Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="LastName" value={this.state.LastName} onChange={this.onChangeLastName}
                                    placeholder="Enter Last Name" />
                            </Col>
                        </FormGroup>
                         <FormGroup row>  
                            <Label for="Email" sm={2}>Email</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Email" value={this.state.Email} onChange={this.onChangeEmail} placeholder="Enter Email" />
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>
                            <Label for="IsActive" sm={2}>Status</Label>
                            <Col sm={10}>
                                {/* <Input type="text" name="IsActive" onChange={this.handleChange} value={this.state.IsActive} placeholder="Enter Address" />*/}
                                <select className="form-control" data-val="true" name="IsActive" defaultValue={this.state.IsActive} onChange={this.handleChangeIsActive}>
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
                          <Button type="submit" color="success">Submit</Button>{' '}  
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
  
export default Edit;  