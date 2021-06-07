import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';

export default class Userlist extends Component {

    constructor(props) {
        super(props);
        this.state = { business: [] };
    }
    componentDidMount() {
     //   debugger;
        axios.get('https://localhost:44356/api/users/Userdetails')
            .then(response => {
                console.log(response.data);
                this.setState({ business: response.data });
                debugger;

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        return this.state.business.map(function (object, i) {
            return <Table obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h4 align="center">User List</h4>
                <table className="table table-striped" style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>PCode</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th colSpan="4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}