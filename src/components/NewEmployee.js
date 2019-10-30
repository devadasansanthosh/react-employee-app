import React, { Component } from 'react';
import axios from 'axios';

class NewEmployee extends Component {
    state = {
        firstName: '',
        lastName: '',
        department: ''
    }

    postDataHandler = () => {
        const emp  = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            department: this.state.department
        }
        axios.post('http://cors-anywhere.herokuapp.com/https://employeeyw23api.cfapps.io/api/employee',emp)
        .then(response => {
            console.log(response);
        })
    }
    render () {
        return (
            <div className="my-1">
                <div className="row">
                First Name:
                    <input className="form-control" 
                    value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})} />
                </div>
                <div className="row">
                Last Name:
                    <input className="form-control" 
                    value={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})} />
                </div>
                <div className="row">
                Department:
                    <input className="form-control" 
                    value={this.state.department} onChange={(event) => this.setState({department: event.target.value})} />
                </div>
                <div className="row">                 
                <button className="btn btn-primary mt-1" onClick={this.postDataHandler}>Add Employee</button>
                </div>
         </div>
        
        );
    }
}

export default NewEmployee;