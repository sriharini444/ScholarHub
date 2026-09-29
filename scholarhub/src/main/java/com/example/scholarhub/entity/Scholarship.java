package com.example.scholarhub.entity;

import jakarta.persistence.*;

@Entity
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String scholarshipName;
    private double amount;
    private double minimumMarks;
    private double maximumIncome;

    public Scholarship() {
    }

    public Scholarship(String scholarshipName, double amount,
                       double minimumMarks, double maximumIncome) {
        this.scholarshipName = scholarshipName;
        this.amount = amount;
        this.minimumMarks = minimumMarks;
        this.maximumIncome = maximumIncome;
    }

    public Long getId() {
        return id;
    }

    public String getScholarshipName() {
        return scholarshipName;
    }

    public void setScholarshipName(String scholarshipName) {
        this.scholarshipName = scholarshipName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getMinimumMarks() {
        return minimumMarks;
    }

    public void setMinimumMarks(double minimumMarks) {
        this.minimumMarks = minimumMarks;
    }

    public double getMaximumIncome() {
        return maximumIncome;
    }

    public void setMaximumIncome(double maximumIncome) {
        this.maximumIncome = maximumIncome;
    }
}