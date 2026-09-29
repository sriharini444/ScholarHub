package com.example.scholarhub.repository;

import com.example.scholarhub.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    boolean existsByStudentIdAndScholarshipId(
            Long studentId,
            Long scholarshipId
    );
}