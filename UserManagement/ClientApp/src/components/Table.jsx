import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Table extends Component {
    constructor(props) {
        super(props);
    }

    DeleteUser = () => {
        axios.delete('https://localhost:44356/api/users/DeleteUser?id=' + this.props.obj.userId)
            .then(json => {
                if (json.data.Status === 'Delete') {
                    alert('Record deleted successfully!!');
                }
            })
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.pCode}
                </td>
                <td>
                    {this.props.obj.firstName}
                </td>
                <td>
                    {this.props.obj.lastName}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.isActive?'Active':'InActive'}
                </td>
                <td>
                    <Link to={"/edit/" + this.props.obj.userId} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={this.DeleteStudent} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default Table;