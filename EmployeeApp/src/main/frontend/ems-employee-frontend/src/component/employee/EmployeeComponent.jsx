import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createEmployee, getEmployee, updateEmployee } from "./EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({ name: "", role: "", salary: "" });
  const navigator = useNavigate(); // Corrected useNavigate
  const { id } = useParams();

  // Fetch employee data if we're editing an existing employee
  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setName(response.data.name);
        setRole(response.data.role);
        setSalary(response.data.salary);
      });
    }
  }, [id]);

  const SaveOrUpdateEmployee = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate form before proceeding
    if (validateForm()) {
      const employee = { name, role, salary };
      console.log("Employee Data:", employee); // Debugging

      if (id) {
        // Update existing employee
        updateEmployee(id, employee)
          .then((response) => {
            console.log("Employee updated:", response.data); // Debugging
            navigator("/employees"); // Redirect to employees list after successful update
          })
          .catch((error) => {
            console.error("There was an error updating the employee!", error);
          });
      } else {
        // Create new employee
        createEmployee(employee)
          .then((response) => {
            console.log("Employee created:", response.data); // Debugging
            navigator("/employees"); // Redirect to employees list after successful creation
          })
          .catch((error) => {
            console.error("There was an error saving the employee!", error);
          });
      }
    } else {
      console.log("Form is invalid"); // Debugging
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Fill name";
      valid = false;
    }

    if (role.trim()) {
      errorsCopy.role = "";
    } else {
      errorsCopy.role = "Fill role";
      valid = false;
    }

    if (salary.trim()) {
      errorsCopy.salary = "";
    } else {
      errorsCopy.salary = "Fill salary";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-5 offset-md-3 ">
          <h2 className="text-center">{id ? "Update Employee" : "Add Employee"}</h2>
          <br />

          <div className="card-body">
            <form onSubmit={SaveOrUpdateEmployee}> {/* Ensure onSubmit is correctly used */}
              <div className="form-group mb-2">
                <label className="form-label font-weight-bold">Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label font-weight-bold">Employee Role</label>
                <input
                  type="text"
                  placeholder="Enter Employee Role"
                  name="role"
                  value={role}
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  onChange={(e) => setRole(e.target.value)}
                />
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label font-weight-bold">Employee Salary</label>
                <input
                  type="text"
                  placeholder="Enter Employee Salary"
                  name="salary"
                  value={salary}
                  className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                  onChange={(e) => setSalary(e.target.value)}
                />
                {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
              </div>

              <div className="center-button">
                <Button
                  type="submit" // This will trigger the form submission
                  variant="success"
                  className="large-button"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
