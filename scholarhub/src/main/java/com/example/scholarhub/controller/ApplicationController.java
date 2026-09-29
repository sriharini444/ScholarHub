package com.example.scholarhub.controller;

import com.example.scholarhub.ApplicationResponse;
import com.example.scholarhub.entity.Application;
import com.example.scholarhub.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Add Application
    @PostMapping
    public Application addApplication(@RequestBody Application application) {
        return applicationService.addApplication(application);
    }

    // Get All Applications
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Get Application by ID
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Application not found with id: " + id));
    }

    // Get Applications by Student ID
    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsByStudent(
            @PathVariable Long studentId) {

        return applicationService.getApplicationsByStudent(studentId);
    }
    // Application Dashboard
    @GetMapping("/student/{studentId}/dashboard")
    public List<ApplicationResponse> getApplicationDashboard(
            @PathVariable Long studentId) {

        return applicationService.getApplicationDashboard(studentId);
    }

    // Update Application
    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @RequestBody Application application) {

        return applicationService.updateApplication(id, application);
    }

    // Delete Application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        applicationService.deleteApplication(id);

        return "Application deleted successfully";
    }
}