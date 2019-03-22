package com.example.employee.employeeboottest;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Contact {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int contact_id;
	private double office_no;
	private double mbl_no;
	
	@JsonBackReference
	@ManyToOne()
	@JoinColumn(name="id")
	private Employee employee;

	public Contact() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Contact(int contact_id, double office_no, double mbl_no, Employee employee) {
		super();
		this.contact_id = contact_id;
		this.office_no = office_no;
		this.mbl_no = mbl_no;
		this.employee = employee;
	}

	public int getContact_id() {
		return contact_id;
	}

	public void setContact_id(int contact_id) {
		this.contact_id = contact_id;
	}

	public double getOffice_no() {
		return office_no;
	}

	public void setOffice_no(double office_no) {
		this.office_no = office_no;
	}

	public double getMbl_no() {
		return mbl_no;
	}

	public void setMbl_no(double mbl_no) {
		this.mbl_no = mbl_no;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	

}
