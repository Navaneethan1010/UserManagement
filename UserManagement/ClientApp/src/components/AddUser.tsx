import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserData } from './GetUser';

interface AddUserDataState {
    title: string;
    loading: boolean;
    empData: UserData;
}

export class AddUser extends React.Component<RouteComponentProps<{}>, AddUserDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true,userData: new UserData };

      
        var userid = this.props.match.params["userid"];

        // This will set state for Edit user  
        if (userid > 0) {
            fetch('api/User/Details/' + userid)
                .then(response => response.json() as Promise<UserData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, UserData: data });
                });
        }

        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false,  userData: new UserData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        //let contents = this.state.loading
        //    ? <p><em>Loading...</em></p>
        //    : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>User</h3>
            <hr />
            {/*{contents}*/}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.  
        if (this.state.userData.userId) {
            fetch('api/User/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/getuser");
                })
        }

        // POST request for Add employee.  
        else {
            fetch('api/User/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/getuser");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/getuser");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="userId" value={this.state.userData.userId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="PCode">PCode</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="PCode" defaultValue={this.state.userData.pCode} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="FirstName">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="FirstName" defaultValue={this.state.userData.firstName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="LastName">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="LastName" defaultValue={this.state.userData.lastName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Email" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Email" defaultValue={this.state.userData.email} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="IsActive">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="isActive" defaultValue={this.state.userData.isActive} required>
                            <option value="">-- Select Status --</option>
                            <option value="1">Active</option>
                            <option value="0">InActive</option>
                        </select>
                    </div>
                </div >
                {/*<div className="form-group row">*/}
                {/*    <label className="control-label col-md-12" htmlFor="City">City</label>*/}
                {/*    <div className="col-md-4">*/}
                {/*        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>*/}
                {/*            <option value="">-- Select City --</option>*/}
                {/*            {cityList.map(city =>*/}
                {/*                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>*/}
                {/*            )}*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div >*/}
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}