package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.CustomizationOption;

public interface CustomizationOptionRepository extends JpaRepository<CustomizationOption, Long> {
   
	List<CustomizationOption> findByType(String type);
	
	CustomizationOption findByTypeAndValue(String type, String value);

}