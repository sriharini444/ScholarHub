package com.example.scholarhub.repository;

import com.example.scholarhub.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}