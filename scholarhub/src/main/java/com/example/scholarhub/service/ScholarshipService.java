package com.example.scholarhub.service;

import com.example.scholarhub.entity.Scholarship;
import com.example.scholarhub.entity.Student;
import com.example.scholarhub.repository.ScholarshipRepository;
import com.example.scholarhub.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final StudentRepository studentRepository;

    public ScholarshipService(
            ScholarshipRepository scholarshipRepository,
            StudentRepository studentRepository) {

        this.scholarshipRepository = scholarshipRepository;
        this.studentRepository = studentRepository;
    }

    // Add Scholarship
    public Scholarship addScholarship(Scholarship scholarship) {
        return scholarshipRepository.save(scholarship);
    }

    // Get All Scholarships
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    // Get Scholarship by ID
    public Optional<Scholarship> getScholarshipById(Long id) {
        return scholarshipRepository.findById(id);
    }

    // Update Scholarship
    public Scholarship updateScholarship(Long id, Scholarship scholarship) {

        Scholarship existingScholarship = scholarshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));

        existingScholarship.setScholarshipName(scholarship.getScholarshipName());
        existingScholarship.setAmount(scholarship.getAmount());
        existingScholarship.setMinimumMarks(scholarship.getMinimumMarks());
        existingScholarship.setMaximumIncome(scholarship.getMaximumIncome());

        return scholarshipRepository.save(existingScholarship);
    }

    // Delete Scholarship
    public void deleteScholarship(Long id) {
        scholarshipRepository.deleteById(id);
    }

    // Find Eligible Scholarships for a Student
    public List<Scholarship> getEligibleScholarships(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Scholarship> scholarships = scholarshipRepository.findAll();

        return scholarships.stream()
                .filter(scholarship ->
                        student.getMarks() >= scholarship.getMinimumMarks()
                                &&
                                student.getAnnualIncome() <= scholarship.getMaximumIncome()
                )
                .toList();
    }
}