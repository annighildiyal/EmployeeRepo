import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "./EmployeeService"; // Ensure deleteEmployee is imported
import { useParams, useNavigate } from "react-router-dom";

const ListEmpComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Corrected use of navigate
  const { id } = useParams();

  useEffect(() => {
    getAllEmployees(); // Fetch all employees on mount
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setError("Error fetching employee data.");
        console.error("Error fetching employees:", error);
      });
  }

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id) // Assuming deleteEmployee is defined in EmployeeService
      .then((response) => {
        console.log(response.data)
        getAllEmployees(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  }

  function pageTitle() {
    if (id) {
      return <h1 className="text-center">Update Employees</h1>;
    } else {
      return <h1 className="text-center">List of Employees</h1>;
    }
  }

  return (
    <div className="container align-center">
      {pageTitle()}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if any */}
      
      <button type="button" className="btn btn-dark" onClick={addNewEmployee}>
        Add Employee
      </button>
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Emp Name</th>
            <th>Emp Role</th>
            <th>Emp Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.salary}</td>
                <td className="p-7">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmpComponent;
