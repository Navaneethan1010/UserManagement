import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface GetUserDataState {
    userList: UserData[];
    loading: boolean;
}

export class GetUser extends React.Component<RouteComponentProps<{}>, GetUserDataState> {
    constructor(props) {
        super(props);
        this.state = { userList: [], loading: true };

        fetch('api/Users/GetUser')
            .then(response => response.json() as Promise<UserData[]>)
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserTable(this.state.userList);

        return <div>
            <h1>Employee Data</h1>
            <p>This component demonstrates fetching User data from the server.</p>
            <p>
                <Link to="/adduser">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an user  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete user with Id: " + id))
            return;
        else {
            fetch('api/User/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        userList: this.state.userList.filter((rec) => {
                            return (rec.userId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/user/edit/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderUserTable(userList: UserData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>UserId</th>
                    <th>Pcode</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Is Active</th>
                </tr>
            </thead>
            <tbody>
                {userList.map(usr =>
                    <tr key={usr.userId}>
                        <td></td>
                        <td>{usr.userId}</td>
                        <td>{usr.pCode}</td>
                        <td>{usr.firstName}</td>
                        <td>{usr.lastName}</td>
                        <td>{usr.isActive}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(usr.userId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(usr.userId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class UserData {
    userId: number = 0;
    pCode: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    isActive: boolean = false;
}