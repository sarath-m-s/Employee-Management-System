import React from "react";
import { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployeeById as getEmployee,
  updateEmployee,
} from "../services/EmployeeService.js";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [id]);

  const handleFirstName = (event) => setFirstName(event.target.value);

  const handleLastName = (event) => setLastName(event.target.value);

  const handleEmail = (event) => setEmail(event.target.value);

  const saveOrUpdateEmployee = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log("Employee => " + JSON.stringify(employee));

      if (id) {
        employee.id = id;
        updateEmployee(id, employee)
          .then((response) => {
            console.log("Employee updated successfully", response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error("There was an error updating the employee!", error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log("Employee added successfully", response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error("There was an error adding the employee!", error);
          });
      }
    }
  }; // <-- Closing brace added here

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.length === 0) {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    } else {
      errorsCopy.firstName = "";
    }
    if (lastName.length === 0) {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    } else {
      errorsCopy.lastName = "";
    }
    if (email.length === 0) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else {
      errorsCopy.email = "";
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Edit Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleFirstName}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email ID:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email ID"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleEmail}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email} </div>
                )}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;