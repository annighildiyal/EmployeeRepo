package com.ag.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ag.entity.Employee;
import com.ag.repo.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	// Add new employee
	public Employee addEmployee(Employee employee) {
		boolean validated = validateEmployee(employee.getName());
		if (validated) {

			return employeeRepository.save(employee);
		} else {
			throw new RuntimeException("not valid name");
		}
	}

	// Get all employees
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	private boolean validateEmployee(String name) {

		return name != "" && !name.isEmpty();
	}

	// Get employee by id
	public Optional<Employee> getEmployeeById(Long id) {
		return employeeRepository.findById(id);
	}

	// Update existing employee
	public Employee updateEmployee(Long id, Employee updatedEmployee) {
		return employeeRepository.findById(id).map(employee -> {
			employee.setName(updatedEmployee.getName());
			employee.setRole(updatedEmployee.getRole());
			employee.setSalary(updatedEmployee.getSalary());
			return employeeRepository.save(employee);
		}).orElseThrow(() -> new RuntimeException("Employee not found"));
	}

	// Delete employee
	public void deleteEmployee(Long id) {
		employeeRepository.deleteById(id);
	}
}
