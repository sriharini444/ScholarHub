package com.example.scholarhub;

public class EligibilityResponse {

    private String studentName;
    private double marks;
    private double annualIncome;
    private boolean eligible;
    private String message;

    public EligibilityResponse(
            String studentName,
            double marks,
            double annualIncome,
            boolean eligible,
            String message) {

        this.studentName = studentName;
        this.marks = marks;
        this.annualIncome = annualIncome;
        this.eligible = eligible;
        this.message = message;
    }

    public String getStudentName() {
        return studentName;
    }

    public double getMarks() {
        return marks;
    }

    public double getAnnualIncome() {
        return annualIncome;
    }

    public boolean isEligible() {
        return eligible;
    }

    public String getMessage() {
        return message;
    }
}