import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import EmployeeList from './components/EmployeeList';


class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    department: '',
    isUpdate: false,
    employees: [],
    currentId: null,
    currentFirstName: '',
    currentLastName: '',
    currentDepartment: ''
  }

  componentDidMount () {
    axios.get('http://cors-anywhere.herokuapp.com/https://employeeyw23api.cfapps.io/api/employee')
    .then(response =>{
        console.log(response.data);
        const employees = response.data;
        const updatedEmployees = employees.map(emp =>{
          return {
          ...emp
          }
        });
        this.setState({employees: updatedEmployees})
    })
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
      this.setState({
        employees: [...this.state.employees,response.data]})
  })
}

editHandler = () => {
  const emp  = {
      id: this.state.currentId,
      firstName: this.state.currentFirstName,
      lastName: this.state.currentLastName,
      department: this.state.currentDepartment
  }
  axios.put('http://cors-anywhere.herokuapp.com/https://employeeyw23api.cfapps.io/api/employee/',emp)
  .then(response => {
      console.log(response);
      console.log(this.state.employees[0].id);
      this.setState({
        isUpdate: false,
        //employees: [...this.state.employees,emp]
      })
  })
}

editRow = (emp) => {
  console.log(emp);
  this.setState({
    isUpdate: true,
    currentId: emp.id,
    currentFirstName: emp.firstName,
    currentLastName: emp.lastName,
    currentDepartment: emp.department.name
  });
}
  render() {
   /*const empList = this.state.employees.map(emp => {
    return <EmployeeList key={emp.id} id={emp.id}
    employee={emp} editRow={editRow}
    />
   })*/
   return(
   <React.Fragment>
    <div>
        <h4 className="bg-primary text-white text-center p-2">
        Employee Information
        </h4>
              
      <div className="container-fluid p-4">
        {this.state.isUpdate ? (
        <div className="my-1">
        <div className="row">
        First Name:
            <input className="form-control" 
            value={this.state.currentFirstName} onChange={(event) => this.setState({currentFirstName: event.target.value})} />
        </div>
        <div className="row">
           Last Name:
               <input className="form-control" 
               value={this.state.currentLastName} onChange={(event) => this.setState({currentLastName: event.target.value})} />
           </div>
           <div className="row">
           Department:
               <input className="form-control" 
               value={this.state.currentDepartment} onChange={(event) => this.setState({currentDepartment: event.target.value})} />
           </div>
           <div className="row">                 
           <button className="btn btn-primary mt-1" onClick={this.editHandler}>Update Employee</button>
           </div>
        </div>
        ):
        (
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
        )
        }
     
         <hr/>
        <div className="col">
        <div className="row bg-info text-white p-2">
            <div className="col font-weight-bold">First Name</div>
            <div className="col font-weight-bold">Last Name</div>
            <div className="col font-weight-bold">Department</div>
            <div className="col font-weight-bold">Actions</div>
          </div>
          <EmployeeList employee={this.state.employees} editRow={this.editRow}/>
        </div>
          
      </div>
  </div>
  </React.Fragment>
   );
}
}

export default App;
