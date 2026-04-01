/**
 * 
 */
package com.ag.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.repository.CrudRepository;

import com.ag.entity.Employee;
import com.ag.repo.EmployeeRepository;

/**
 * 
 */

@ExtendWith(MockitoExtension.class)

class EmployeeServiceTest {

	@InjectMocks
	private EmployeeService employeeService;
	
	
	@Mock
	private EmployeeRepository employeeRepository;
	
	private static Employee employee=null;
	
	@BeforeAll
	public static void init()
	{
		employee=new Employee();
		employee.setName("ankita");
		//employee.setId(1L);
		
	}
	/**
	 * Test method for {@link com.ag.service.EmployeeService#addEmployee(com.ag.entity.Employee)}.
	 */
	@Test
	void testAddEmployee() {
		
		employee.setName("ankita");
		Mockito.when(employeeRepository.save(employee)).thenReturn(employee);
		Employee addedEmp=employeeRepository.save(employee);
		assertEquals(employee.getName(), addedEmp.getName());
		assertNotNull(employee);
		assertTrue(employee.getName()=="ankita");
		
		
	}
	
	
	
	
	
	
	@Test
	void addThrowExceptionForInvalidEmployee() {
		//Employee employee=new Employee();
		employee.setName("");//will failthe test as exception not falling as name is there
		RuntimeException runtimeException=assertThrows(RuntimeException.class, ()->{
			employeeService.addEmployee(employee);
		
		});
		assertEquals("not valid name", runtimeException.getMessage());
		
		
	}
	//accesseing private method with the help of reflection
	@Test
	void testPrivateMethodValidateEmployee() throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Method validateEmpMethod=EmployeeService.class.getDeclaredMethod("validateEmployee", String.class);
		
		validateEmpMethod.setAccessible(true);
		Boolean empName=(Boolean) validateEmpMethod.invoke(employeeService, "ank");
		assertTrue(empName);
	}
	
	@Test
	void testPrivateMethodInValidateEmployee() throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Method validateEmpMethod=EmployeeService.class.getDeclaredMethod("validateEmployee", String.class);
		
		validateEmpMethod.setAccessible(true);
		Boolean empName=(Boolean) validateEmpMethod.invoke(employeeService, "");
		assertFalse(empName);
	}

	/**
	 * Test method for {@link com.ag.service.EmployeeService#getAllEmployees()}.
	 */
//	@Test
//	void testGetAllEmployees() {
//		fail("Not yet implemented");
//	}
//
//	/**
//	 * Test method for {@link com.ag.service.EmployeeService#getEmployeeById(java.lang.Long)}.
//	 */
//	@Test
//	void testGetEmployeeById() {
//		fail("Not yet implemented");
//	}
//
//	/**
//	 * Test method for {@link com.ag.service.EmployeeService#updateEmployee(java.lang.Long, com.ag.entity.Employee)}.
//	 */
//	@Test
//	void testUpdateEmployee() {
//		fail("Not yet implemented");
//	}
//
//	/**
//	 * Test method for {@link com.ag.service.EmployeeService#deleteEmployee(java.lang.Long)}.
//	 */
	@Test
	void testDeleteEmployee() {
		doNothing().when(employeeRepository).deleteById((long) 1);
	employeeRepository.deleteById((long) 1);
	verify(employeeRepository, times(1)).deleteById((long) 1);
	
	}

}
