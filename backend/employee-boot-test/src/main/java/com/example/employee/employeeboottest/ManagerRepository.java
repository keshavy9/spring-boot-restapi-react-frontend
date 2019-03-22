package com.example.employee.employeeboottest;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
	
	@Query(value="Select manager_id  from manager where manager_name = :mgr_name", nativeQuery = true)
	List<Integer> getManagerId(@Param("mgr_name") String mgr_name);
	
}
