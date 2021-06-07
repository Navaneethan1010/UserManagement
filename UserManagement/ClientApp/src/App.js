import React from 'react';
import AddUser from './components/AddUser.jsx';
import Userlist from './components/UserList';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navheader">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/Adduser'} className="nav-link">Adduser</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/Userlist'} className="nav-link">User List</Link>
                            </li>
                        </ul>
                    </div>
                </nav> <br />
                <Switch>
                    <Route exact path='/AddUser' component={AddUser} />
                    <Route path='/edit/:id' component={EditUser} />
                    <Route path='/Userlist' component={Userlist} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;