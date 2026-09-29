const API_URL = "http://localhost:8080";


// =====================================================
// PAGE NAVIGATION
// =====================================================

function showSection(sectionId, clickedButton) {

    const sections = document.querySelectorAll(".page-section");

    sections.forEach(function (section) {
        section.classList.remove("active-section");
    });

    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    if (sectionId === "scholarships") {
        loadScholarships();
    }
}


// =====================================================
// DASHBOARD
// =====================================================

async function loadDashboardStats() {

    try {

        // Get students
        const studentResponse =
            await fetch(API_URL + "/students");

        if (studentResponse.ok) {

            const students =
                await studentResponse.json();

            const studentCount =
                document.getElementById("studentCount");

            if (studentCount) {
                studentCount.textContent =
                    students.length;
            }
        }


        // Get scholarships
        const scholarshipResponse =
            await fetch(API_URL + "/scholarships");

        if (scholarshipResponse.ok) {

            const scholarships =
                await scholarshipResponse.json();

            const scholarshipCount =
                document.getElementById("scholarshipCount");

            if (scholarshipCount) {
                scholarshipCount.textContent =
                    scholarships.length;
            }
        }

    } catch (error) {

        console.log(
            "Dashboard statistics could not be loaded."
        );
    }
}


// =====================================================
// GET STUDENT BY ID
// =====================================================

async function getStudent() {

    const studentId =
        document
            .getElementById("studentId")
            .value
            .trim();


    if (studentId === "") {

        alert("Please enter Student ID");

        return;
    }


    const result =
        document.getElementById("studentResult");


    result.innerHTML = `
        <div class="loading-box">
            ⏳ Loading student details...
        </div>
    `;


    try {

        const response =
            await fetch(
                API_URL + "/students/" + studentId
            );


        if (!response.ok) {

            throw new Error(
                "Student not found with ID: " +
                studentId
            );
        }


        const student =
            await response.json();


        result.innerHTML = `

            <div class="student-result-card">

                <div class="student-result-icon">
                    👨‍🎓
                </div>

                <div class="student-result-content">

                    <span class="result-label">
                        STUDENT PROFILE
                    </span>

                    <h3>
                        ${student.name}
                    </h3>

                    <div class="student-result-grid">

                        <div>
                            <span>Email</span>

                            <strong>
                                ${student.email}
                            </strong>
                        </div>


                        <div>
                            <span>Marks</span>

                            <strong>
                                ${student.marks}
                            </strong>
                        </div>


                        <div>
                            <span>Annual Income</span>

                            <strong>
                                ₹${student.annualIncome}
                            </strong>
                        </div>


                        <div>
                            <span>Student ID</span>

                            <strong>
                                #${student.id}
                            </strong>
                        </div>

                    </div>


                    <!-- UPDATE AND DELETE BUTTONS -->

                    <div class="student-actions">

                        <button
                            onclick="updateStudent(${student.id})">

                            ✏️ Update

                        </button>


                        <button
                            onclick="deleteStudent(${student.id})">

                            🗑️ Delete

                        </button>

                    </div>

                </div>

            </div>
        `;


        // Update placeholder
        const placeholder =
            document.getElementById(
                "studentDetailsPlaceholder"
            );


        if (placeholder) {

            placeholder.innerHTML = `

                <div>
                    🎉
                </div>

                <h3>
                    ${student.name}
                </h3>

                <p>
                    Student ID #${student.id}
                    successfully found.
                </p>

            `;
        }


    } catch (error) {

        result.innerHTML = `

            <div class="error-box">

                ❌ ${error.message}

            </div>

        `;
    }
}


// =====================================================
// OPEN ADD STUDENT MODAL
// =====================================================

function openAddStudentModal() {

    const modal =
        document.getElementById(
            "addStudentModal"
        );


    modal.classList.add("show");


    document.getElementById(
        "addStudentResult"
    ).innerHTML = "";


    setTimeout(function () {

        document
            .getElementById("newStudentName")
            .focus();

    }, 200);
}


// =====================================================
// CLOSE ADD STUDENT MODAL
// =====================================================

function closeAddStudentModal() {

    const modal =
        document.getElementById(
            "addStudentModal"
        );


    modal.classList.remove("show");


    document.getElementById(
        "newStudentName"
    ).value = "";


    document.getElementById(
        "newStudentEmail"
    ).value = "";


    document.getElementById(
        "newStudentMarks"
    ).value = "";


    document.getElementById(
        "newStudentIncome"
    ).value = "";


    document.getElementById(
        "addStudentResult"
    ).innerHTML = "";
}


// =====================================================
// ADD NEW STUDENT
// =====================================================

async function addStudent() {

    const name =
        document
            .getElementById("newStudentName")
            .value
            .trim();


    const email =
        document
            .getElementById("newStudentEmail")
            .value
            .trim();


    const marks =
        document
            .getElementById("newStudentMarks")
            .value;


    const annualIncome =
        document
            .getElementById("newStudentIncome")
            .value;


    // Validation

    if (name === "") {

        alert("Please enter student name");

        return;
    }


    if (email === "") {

        alert("Please enter email");

        return;
    }


    if (marks === "") {

        alert("Please enter marks");

        return;
    }


    if (annualIncome === "") {

        alert("Please enter annual income");

        return;
    }


    if (
        Number(marks) < 0 ||
        Number(marks) > 100
    ) {

        alert(
            "Marks must be between 0 and 100"
        );

        return;
    }


    const result =
        document.getElementById(
            "addStudentResult"
        );


    result.innerHTML = `

        <div class="loading-box">
            ⏳ Adding student...
        </div>

    `;


    const studentData = {

        name: name,

        email: email,

        marks: Number(marks),

        annualIncome: Number(annualIncome)

    };


    try {

        const response =
            await fetch(
                API_URL + "/students",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(studentData)
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Unable to add student"
            );
        }


        const student =
            await response.json();


        result.innerHTML = `

            <div class="success-box">

                ✅ Student added successfully!

                <br><br>

                <strong>
                    Student ID:
                    #${student.id}
                </strong>

            </div>

        `;


        loadDashboardStats();


        // Clear form

        document.getElementById(
            "newStudentName"
        ).value = "";


        document.getElementById(
            "newStudentEmail"
        ).value = "";


        document.getElementById(
            "newStudentMarks"
        ).value = "";


        document.getElementById(
            "newStudentIncome"
        ).value = "";


        setTimeout(function () {

            closeAddStudentModal();

        }, 1500);


    } catch (error) {

        console.error(error);


        result.innerHTML = `

            <div class="error-box">

                ❌ Failed to add student.

                <br>

                ${error.message}

            </div>

        `;
    }
}


// =====================================================
// UPDATE STUDENT
// =====================================================

async function updateStudent(id) {

    try {

        // First get existing student
        const getResponse =
            await fetch(
                API_URL + "/students/" + id
            );


        if (!getResponse.ok) {

            throw new Error(
                "Student not found"
            );
        }


        const student =
            await getResponse.json();


        // Ask for updated name

        const name =
            prompt(
                "Enter Student Name:",
                student.name
            );


        if (name === null) {
            return;
        }


        // Ask for updated email

        const email =
            prompt(
                "Enter Email:",
                student.email
            );


        if (email === null) {
            return;
        }


        // Ask for updated marks

        const marks =
            prompt(
                "Enter Marks:",
                student.marks
            );


        if (marks === null) {
            return;
        }


        // Ask for updated income

        const annualIncome =
            prompt(
                "Enter Annual Income:",
                student.annualIncome
            );


        if (annualIncome === null) {
            return;
        }


        // Validation

        if (name.trim() === "") {

            alert(
                "Student name cannot be empty"
            );

            return;
        }


        if (email.trim() === "") {

            alert(
                "Email cannot be empty"
            );

            return;
        }


        if (
            Number(marks) < 0 ||
            Number(marks) > 100
        ) {

            alert(
                "Marks must be between 0 and 100"
            );

            return;
        }


        if (
            annualIncome === "" ||
            Number(annualIncome) < 0
        ) {

            alert(
                "Please enter a valid annual income"
            );

            return;
        }


        // Updated object

        const updatedStudent = {

            name: name.trim(),

            email: email.trim(),

            marks: Number(marks),

            annualIncome:
                Number(annualIncome)

        };


        // PUT request

        const response =
            await fetch(
                API_URL + "/students/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedStudent
                        )
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Unable to update student"
            );
        }


        await response.json();


        alert(
            "✅ Student updated successfully!"
        );


        // Refresh student details

        document.getElementById(
            "studentId"
        ).value = id;


        getStudent();


        // Update dashboard

        loadDashboardStats();


    } catch (error) {

        console.error(error);


        alert(
            "❌ Failed to update student: " +
            error.message
        );
    }
}


// =====================================================
// DELETE STUDENT
// =====================================================

async function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete Student ID #" +
            id +
            "?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response =
            await fetch(
                API_URL + "/students/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Unable to delete student"
            );
        }


        await response.text();


        alert(
            "✅ Student deleted successfully!"
        );


        // Clear student result

        document.getElementById(
            "studentResult"
        ).innerHTML = "";


        // Clear student ID

        document.getElementById(
            "studentId"
        ).value = "";


        // Update dashboard

        loadDashboardStats();


    } catch (error) {

        console.error(error);


        alert(
            "❌ Failed to delete student: " +
            error.message
        );
    }
}


// =====================================================
// LOAD ALL SCHOLARSHIPS
// =====================================================

async function loadScholarships() {

    const container =
        document.getElementById(
            "scholarshipList"
        );


    container.innerHTML = `

        <div class="loading-box">
            ⏳ Loading scholarships...
        </div>

    `;


    try {

        const response =
            await fetch(
                API_URL + "/scholarships"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load scholarships"
            );
        }


        const scholarships =
            await response.json();


        if (
            !scholarships ||
            scholarships.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    <div>
                        🎓
                    </div>

                    <h3>
                        No scholarships available
                    </h3>

                    <p>
                        No scholarship schemes
                        are currently available.
                    </p>

                </div>

            `;

            return;
        }


        container.innerHTML = "";


        scholarships.forEach(
            function (scholarship) {

                container.innerHTML += `

                    <div class="scholarship-card">

                        <div class="scholarship-card-top">

                            <div class="scholarship-icon">
                                🎓
                            </div>

                            <span class="available-badge">
                                AVAILABLE
                            </span>

                        </div>


                        <h3>
                            ${scholarship.scholarshipName}
                        </h3>


                        <div class="scholarship-amount">

                            ₹${scholarship.amount}

                        </div>


                        <div class="scholarship-details">

                            <div>

                                <span>
                                    Minimum Marks
                                </span>

                                <strong>
                                    ${scholarship.minimumMarks}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Maximum Income
                                </span>

                                <strong>
                                    ₹${scholarship.maximumIncome}
                                </strong>

                            </div>

                        </div>

                    </div>

                `;
            }
        );


        const scholarshipCount =
            document.getElementById(
                "scholarshipCount"
            );


        if (scholarshipCount) {

            scholarshipCount.textContent =
                scholarships.length;
        }


    } catch (error) {

        container.innerHTML = `

            <div class="error-box">

                ❌ ${error.message}

            </div>

        `;
    }
}


// =====================================================
// SHOW SCHOLARSHIPS
// =====================================================

function showScholarships() {

    showSection("scholarships");

    loadScholarships();
}


// =====================================================
// GET ELIGIBLE SCHOLARSHIPS
// =====================================================

async function getEligibleScholarships() {

    const studentId =
        document
            .getElementById(
                "eligibleStudentId"
            )
            .value
            .trim();


    if (studentId === "") {

        alert(
            "Please enter Student ID"
        );

        return;
    }


    const container =
        document.getElementById(
            "eligibleList"
        );


    container.innerHTML = `

        <div class="loading-box">
            ⏳ Checking eligibility...
        </div>

    `;


    try {

        const response =
            await fetch(
                API_URL +
                "/scholarships/student/" +
                studentId +
                "/eligible"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to check eligibility"
            );
        }


        const scholarships =
            await response.json();


        if (
            !scholarships ||
            scholarships.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    <div>
                        🔍
                    </div>

                    <h3>
                        No eligible scholarships
                    </h3>

                    <p>
                        This student does not currently
                        match any scholarship criteria.
                    </p>

                </div>

            `;

            return;
        }


        container.innerHTML = "";


        scholarships.forEach(
            function (scholarship) {

                container.innerHTML += `

                    <div class="scholarship-card eligible-card">

                        <div class="scholarship-card-top">

                            <div class="scholarship-icon">
                                ✅
                            </div>

                            <span class="eligible-badge">
                                ELIGIBLE
                            </span>

                        </div>


                        <h3>
                            ${scholarship.scholarshipName}
                        </h3>


                        <div class="scholarship-amount">

                            ₹${scholarship.amount}

                        </div>


                        <div class="scholarship-details">

                            <div>

                                <span>
                                    Minimum Marks
                                </span>

                                <strong>
                                    ${scholarship.minimumMarks}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Maximum Income
                                </span>

                                <strong>
                                    ₹${scholarship.maximumIncome}
                                </strong>

                            </div>

                        </div>

                    </div>

                `;
            }
        );


    } catch (error) {

        container.innerHTML = `

            <div class="error-box">

                ❌ ${error.message}

            </div>

        `;
    }
}


// =====================================================
// GET APPLICATIONS
// =====================================================

async function getApplications() {

    const studentId =
        document
            .getElementById(
                "applicationStudentId"
            )
            .value
            .trim();


    if (studentId === "") {

        alert(
            "Please enter Student ID"
        );

        return;
    }


    const container =
        document.getElementById(
            "applicationList"
        );


    container.innerHTML = `

        <div class="loading-box">
            ⏳ Loading applications...
        </div>

    `;


    try {

        const response =
            await fetch(
                API_URL +
                "/applications/student/" +
                studentId +
                "/dashboard"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load applications"
            );
        }


        const applications =
            await response.json();


        if (
            !applications ||
            applications.length === 0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    <div>
                        📄
                    </div>

                    <h3>
                        No applications found
                    </h3>

                    <p>
                        No scholarship applications
                        are available for Student ID
                        #${studentId}.
                    </p>

                </div>

            `;

            return;
        }


        container.innerHTML = "";


        applications.forEach(
            function (application) {

                const status =
                    application.status ||
                    "PENDING";


                let statusClass =
                    "status-pending";


                if (
                    status.toUpperCase() ===
                    "APPROVED"
                ) {

                    statusClass =
                        "status-approved";

                } else if (
                    status.toUpperCase() ===
                    "REJECTED"
                ) {

                    statusClass =
                        "status-rejected";
                }


                container.innerHTML += `

                    <div class="application-card">

                        <div class="application-icon">
                            📄
                        </div>


                        <div class="application-content">

                            <span class="application-label">
                                SCHOLARSHIP
                            </span>

                            <h3>
                                ${application.scholarshipName}
                            </h3>


                            <div class="application-info">

                                <div>

                                    <span>
                                        Student
                                    </span>

                                    <strong>
                                        ${application.studentName}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Amount
                                    </span>

                                    <strong>
                                        ₹${application.amount}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Status
                                    </span>

                                    <strong
                                        class="${statusClass}">

                                        ${status}

                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                `;
            }
        );


    } catch (error) {

        container.innerHTML = `

            <div class="error-box">

                ❌ ${error.message}

            </div>

        `;
    }
}


// =====================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =====================================================

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "addStudentModal"
            );


        if (
            event.target === modal
        ) {

            closeAddStudentModal();
        }

    }
);


// =====================================================
// ESC KEY CLOSE MODAL
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const modal =
                document.getElementById(
                    "addStudentModal"
                );


            if (
                modal &&
                modal.classList.contains("show")
            ) {

                closeAddStudentModal();
            }
        }

    }
);


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboardStats();

    }
);