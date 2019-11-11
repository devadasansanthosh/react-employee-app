import React from 'react';

const empList = props => (
    <div>
    {props.employee.map(emp => (
        <div className="row bg-light p-2 border" key={emp.id}>
            <div className="col">{emp.firstName}</div>
            <div className="col">{emp.lastName}</div>
            <div className="col">{emp.department.name}</div>
            <div className="col">
            <button className="btn btn-secondary" onClick={() => {props.editRow(emp)}}>Update</button>
            <button className="btn btn-secondary" onClick={() => {props.deleteHandler(emp)}}>Delete</button>
            </div>
          </div>
    ))}
    </div>
);

export default empList;