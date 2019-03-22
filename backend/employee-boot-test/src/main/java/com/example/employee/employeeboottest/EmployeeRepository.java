package com.example.employee.employeeboottest;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	
	@Query(value="Select * from employee where manager_id in :mgrid",nativeQuery=true)
	List<Employee> getEmployeeByName(@Param("mgrid") List<Integer> mgrid);
	
	
	@Query(value="select * from employee", nativeQuery = true)
	List<Employee> getAll();
	
}
