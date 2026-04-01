package com.ag.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ag.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
