package com.example.employee.employeeboottest;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="manager")
public class Manager implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int manager_id;
	private String manager_name;
	@JsonManagedReference
	//@JsonIgnoreProperties("manager")
	@OneToMany(mappedBy="manager")
	private List<Employee> employees = new ArrayList<>();
	
	public int getManager_id() {
		return manager_id;
	}
	/*public void setManager_id(int manager_id) {
		this.manager_id = manager_id;
	}*/
	public String getManager_name() {
		return manager_name;
	}
	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}
	public List<Employee> getEmployees() {
		return employees;
	}
	public void addEmployee(Employee employee) {
		this.employees.add(employee);
		employee.setManager(this);
	}
	public void removeEmployee(Employee employee) {
		this.employees.remove(employee);
	}
	@Override
	public String toString() {
		return "Manager [manager_id=" + manager_id + ", manager_name=" + manager_name + ", employees=" + employees
				+ "]";
	}
	
	
}
