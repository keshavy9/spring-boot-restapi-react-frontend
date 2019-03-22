package com.example.employee.employeeboottest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository repository;
	@Autowired
	private ManagerRepository mgrRepo;
	@Autowired
	private EmployeeDao dao;
	
	@GetMapping("/allmgr")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Manager> getmgr(){
		return dao.getMgr();
	}

/*	@RequestMapping(value="/allemps", produces="application/json", method=RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Employee> getAllEmp(){
		return dao.getJoin();
	}*/
	
	@GetMapping("/mgr/{mname}")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Employee> getEmpfromMgr(@PathVariable(value="mname") String mname){
		return dao.getEmpfromManagerName(mname);
	}
	
	@GetMapping("/emps")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Employee> getAll(){
		return repository.getAll();
	}
	
	@GetMapping("/mgrs")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Manager> getAllmgr(){
		return mgrRepo.findAll();
	}
	@GetMapping("/mgrid")
	public List<Integer> getMgrid(String mname){
		return mgrRepo.getManagerId(mname);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/emps/{mname}")
	public List<Employee> empdetails(@PathVariable("mname") String mname){
		List<Integer> id = mgrRepo.getManagerId(mname);
		return repository.getEmployeeByName(id);
		
	}
	
	@GetMapping("/test/")
	public List<Manager> mgr(){
		return dao.getManager();
	}
	
	@PostMapping("/test1")
	public List<Employee> Test1(@RequestBody Employee emp){
		return dao.addEmpDao(emp);
	}

	
	
	@GetMapping("/empdao")
	public List<Employee> empbyname(){
		return dao.getAllEmpsDao();
	}

	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addemp")
	public Employee addEmp(@RequestBody Employee emp){
		return repository.save(emp);
	}
	

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addmgr")
	public int addMgr(@RequestBody Manager mgr){
		
		Manager m = new Manager();
		m = mgrRepo.save(mgr);
		return m.getManager_id();
	}
	
	
	@GetMapping("/emp/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Employee empById(@PathVariable(value="id") Long empid){
		return repository.findById(empid).orElseThrow(() -> new EmployeeNotFoundException(empid));
	}
	
 
	
	@DeleteMapping("delemp/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public void deleteEmp(@PathVariable(value="id") Long id){
		 repository.deleteById(id);
		 System.out.println("Employee with id %d deleted successfully"+id);
	}
	
}
