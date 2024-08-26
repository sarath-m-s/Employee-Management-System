import React, { useState, useEffect } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching employees", error);
      });
  }

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div className="container">
      <h2>List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
