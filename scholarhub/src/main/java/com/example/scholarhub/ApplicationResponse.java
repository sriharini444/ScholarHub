package com.example.scholarhub;

public class ApplicationResponse {

    private String studentName;
    private String scholarshipName;
    private double amount;
    private String status;

    public ApplicationResponse(String studentName,
                               String scholarshipName,
                               double amount,
                               String status) {

        this.studentName = studentName;
        this.scholarshipName = scholarshipName;
        this.amount = amount;
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getScholarshipName() {
        return scholarshipName;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }
}