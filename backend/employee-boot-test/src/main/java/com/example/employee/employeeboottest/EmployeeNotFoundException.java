package com.example.employee.employeeboottest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EmployeeNotFoundException extends RuntimeException {
	
	Long eid;
	public EmployeeNotFoundException(Long eid) {
		super(String.format("Employee with id %d not found", eid));
		this.eid = eid;
	}

	public Long getEid() {
		return eid;
	}
	
	
}
