package com.example.scholarhub.service;

import com.example.scholarhub.ApplicationResponse;
import com.example.scholarhub.entity.Application;
import com.example.scholarhub.entity.Scholarship;
import com.example.scholarhub.entity.Student;
import com.example.scholarhub.repository.ApplicationRepository;
import com.example.scholarhub.repository.ScholarshipRepository;
import com.example.scholarhub.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final ScholarshipRepository scholarshipRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            StudentRepository studentRepository,
            ScholarshipRepository scholarshipRepository) {

        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
        this.scholarshipRepository = scholarshipRepository;
    }

    // Add Application
    public Application addApplication(Application application) {

        // Check duplicate application
        boolean alreadyApplied =
                applicationRepository.existsByStudentIdAndScholarshipId(
                        application.getStudentId(),
                        application.getScholarshipId()
                );

        if (alreadyApplied) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Student has already applied for this scholarship"
            );
        }

        // Check student exists
        Student student = studentRepository.findById(application.getStudentId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        // Check scholarship exists
        Scholarship scholarship = scholarshipRepository
                .findById(application.getScholarshipId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Scholarship not found"
                ));

        // Check eligibility
        boolean eligible =
                student.getMarks() >= scholarship.getMinimumMarks()
                        &&
                        student.getAnnualIncome() <= scholarship.getMaximumIncome();

        if (!eligible) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Student is not eligible for this scholarship"
            );
        }

        // New application starts as PENDING
        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }

    // Get All Applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get Application by ID
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    // Get Applications by Student ID
    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    // Get Application Dashboard
    public List<ApplicationResponse> getApplicationDashboard(Long studentId) {

        List<Application> applications =
                applicationRepository.findByStudentId(studentId);

        return applications.stream()
                .map(application -> {

                    Student student = studentRepository
                            .findById(application.getStudentId())
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Student not found"
                            ));

                    Scholarship scholarship = scholarshipRepository
                            .findById(application.getScholarshipId())
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Scholarship not found"
                            ));

                    return new ApplicationResponse(
                            student.getName(),
                            scholarship.getScholarshipName(),
                            scholarship.getAmount(),
                            application.getStatus()
                    );
                })
                .toList();
    }

    // Update Application
    public Application updateApplication(
            Long id,
            Application application) {

        Application existingApplication =
                applicationRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Application not found"
                        ));

        existingApplication.setStudentId(application.getStudentId());
        existingApplication.setScholarshipId(application.getScholarshipId());
        existingApplication.setStatus(application.getStatus());

        return applicationRepository.save(existingApplication);
    }

    // Delete Application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}