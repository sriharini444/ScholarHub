package com.example.scholarhub.service;

import com.example.scholarhub.entity.Student;
import com.example.scholarhub.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.example.scholarhub.EligibilityResponse;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create Student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update Student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setAnnualIncome(student.getAnnualIncome());
        existingStudent.setMarks(student.getMarks());

        return studentRepository.save(existingStudent);
    }

    // Delete Student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Check Scholarship Eligibility
    public EligibilityResponse checkEligibility(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        boolean eligible = student.getMarks() >= 80 &&
                student.getAnnualIncome() <= 200000;

        String message;

        if (eligible) {
            message = "Student is eligible for scholarship";
        } else {
            message = "Student is not eligible for scholarship";
        }

        return new EligibilityResponse(
                student.getName(),
                student.getMarks(),
                student.getAnnualIncome(),
                eligible,
                message
        );
    }
}