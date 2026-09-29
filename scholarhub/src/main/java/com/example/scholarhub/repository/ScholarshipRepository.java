package com.example.scholarhub.repository;

import com.example.scholarhub.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
}