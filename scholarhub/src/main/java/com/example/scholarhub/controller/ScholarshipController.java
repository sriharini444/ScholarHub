package com.example.scholarhub.controller;

import com.example.scholarhub.entity.Scholarship;
import com.example.scholarhub.service.ScholarshipService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/scholarships")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    public ScholarshipController(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }

    // Add Scholarship
    @PostMapping
    public Scholarship addScholarship(@RequestBody Scholarship scholarship) {
        return scholarshipService.addScholarship(scholarship);
    }

    // Get All Scholarships
    @GetMapping
    public List<Scholarship> getAllScholarships() {
        return scholarshipService.getAllScholarships();
    }

    // Get Scholarship by ID
    @GetMapping("/{id}")
    public Scholarship getScholarshipById(@PathVariable Long id) {
        return scholarshipService.getScholarshipById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Scholarship not found with id: " + id));
    }

    // Get Eligible Scholarships for a Student
    @GetMapping("/student/{studentId}/eligible")
    public List<Scholarship> getEligibleScholarships(
            @PathVariable Long studentId) {

        return scholarshipService.getEligibleScholarships(studentId);
    }

    // Update Scholarship
    @PutMapping("/{id}")
    public Scholarship updateScholarship(
            @PathVariable Long id,
            @RequestBody Scholarship scholarship) {

        return scholarshipService.updateScholarship(id, scholarship);
    }

    // Delete Scholarship
    @DeleteMapping("/{id}")
    public String deleteScholarship(@PathVariable Long id) {

        scholarshipService.deleteScholarship(id);

        return "Scholarship deleted successfully";
    }
}