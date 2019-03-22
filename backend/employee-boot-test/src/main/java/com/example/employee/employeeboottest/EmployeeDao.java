package com.example.employee.employeeboottest;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EmployeeDao {
	@PersistenceContext
	private EntityManager em;
	
	
	public List<Employee> getAllEmpsDao(){
		List<Employee> emplist = new ArrayList<>();
		Query q = em.createNativeQuery("select * from employee");
		return  emplist = q.getResultList();
	}
	
	public List<Employee> getEmpfromManagerName(String name){
		List<Employee> emplist = new ArrayList<>();
		Query q = em.createNativeQuery("Select id, name, age, salary from employee where manager_id in (select manager_id from manager where manager_name=?)");
		q.setParameter(1, name);
		return  emplist = q.getResultList();

	}
	public List<Manager> getManager(){
		List<Manager> mgrList = new ArrayList<>();
		Employee e = new Employee();
		e.setAge(24);
		e.setId(1L);
		e.setName("keshav");
		e.setSalary(20000);
		
		Manager m = new Manager();
		//m.setManager_id(1);
		m.setManager_name("amey");
		m.addEmployee(e);
		
		//e.setManager(m); this thing triggers the loop
		
		mgrList.add(m);
		return mgrList;
		
 	}
	
	@Transactional
	public List<Employee> addEmpDao(Employee emp){
		
		Employee e = new Employee();
		e.setName(emp.getName());
		e.setAge(emp.getAge());
		e.setSalary(emp.getSalary());
		em.persist(e);
		Manager m = new Manager();
		m.setManager_name(emp.getManager().getManager_name());
		m.addEmployee(e);
		em.persist(m);
		//e.setManager(m);
		List<Employee> mgrlist = m.getEmployees();
		return mgrlist;
		
	}
	
	
/*	public List<Employee> getJoin(){
		
		List<Employee> emplist = new ArrayList<>();
		Query q = em.createNativeQuery("Select e.id, e.name, e.age, e.salary, m.manager_name from test2.employee e inner join test2.manager m on e.manager_manager_id=m.manager_id");
		return  emplist = q.getResultList();
	}*/
	
	public List<Manager> getMgr(){
		List<Manager> mgrlist = new ArrayList<>();
		Query q = em.createNativeQuery("Select * from manager");
		return mgrlist = q.getResultList();
	}
	

}
