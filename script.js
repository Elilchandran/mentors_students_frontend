document.addEventListener('DOMContentLoaded', () => {
    const createMentorForm = document.getElementById('createMentorForm');
    const createStudentForm = document.getElementById('createStudentForm');
    const assignStudentForm = document.getElementById('assignStudentForm');
    const mentorStudentsList = document.getElementById('mentorStudentsList');
    const resultMessage = document.getElementById('resultMessage');

    // Event listener for creating a mentor
    createMentorForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const mentorName = document.getElementById('mentorName').value;

        try {
            const mentor = await createMentor(mentorName);
            console.log('Created Mentor:', mentor);
            displayResult('createMentorResult', 'Mentor created successfully', true);
        } catch (error) {
            console.error('Error creating Mentor:', error);
            displayResult('createMentorResult', 'Failed to create Mentor', false);
        }
    });

    // Event listener for creating a student
    createStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;

        try {
            const student = await createStudent(studentName);
            console.log('Created Student:', student);
            displayResult('createStudentResult', 'Student created successfully', true);
        } catch (error) {
            console.error('Error creating Student:', error);
            displayResult('createStudentResult', 'Failed to create Student', false);
        }
    });

    // Event listener for assigning a student to a mentor
    assignStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const mentorId = document.getElementById('mentorId').value;
        const studentId = document.getElementById('studentId').value;

        try {
            const assignmentResult = await assignStudentToMentor(mentorId, studentId);
            console.log('Assignment Result:', assignmentResult);
            displayResult('assignStudentResult', 'Student assigned to Mentor successfully', true);
        } catch (error) {
            console.error('Error assigning Student to Mentor:', error);
            displayResult('assignStudentResult', 'Failed to assign Student to Mentor', false);
        }
    });

    // Function to get and display students for a mentor
    window.getMentorStudents = async () => {
        const mentorId = prompt('Enter Mentor ID:');
        console.log('Entered Mentor ID:', mentorId);
        if (mentorId) {
            try {
                const students = await getStudentsForMentor(mentorId);
                console.log('Fetched Students:', students);
                displayStudents(students);
            } catch (error) {
                console.error('Error fetching Students:', error);
                displayResult('Failed to fetch Students', false);
            }
        }
    };

    // Helper function to display a list of students
    const displayStudents = (students) => {
        mentorStudentsList.innerHTML = '';

        // Create a table with Bootstrap classes and custom styling
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-success');
        table.style['background-color'] = '#cee647';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Student Name';
        headerRow.appendChild(nameHeader);
        thead.appendChild(headerRow);
        table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    students.forEach(student => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        row.appendChild(nameCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to mentorStudentsList
    mentorStudentsList.appendChild(table);
};

// Helper function to display the result with a tick mark or cross mark
const displayResult = (resultId, message, success) => {
    const resultElement = document.getElementById(resultId);
    resultElement.textContent = message;
    resultElement.style.color = success ? 'green' : 'red';
    resultElement.style.display = 'block';

    // Hide the result message after a few seconds
    setTimeout(() => {
        resultElement.style.display = 'none';
    }, 4000);
};

// Function to create a mentor
const createMentor = async (mentorName) => {
    try {
        const response = await fetch('https://mentor-student-backend-5pk5.onrender.com/api/mentors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: mentorName }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating Mentor:', error);
        throw error; 
    }
};

// Function to create a student
const createStudent = async (studentName) => {
    try {
        const response = await fetch('https://mentor-student-backend-5pk5.onrender.com/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: studentName }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating Student:', error);
        throw error; 
    }
};

// Function to assign a student to a mentor
const assignStudentToMentor = async (mentorId, studentId) => {
    try {
        const response = await fetch('https://mentor-student-backend-5pk5.onrender.com/api/assign', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mentorId: mentorId,
                studentId: studentId,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error assigning Student to Mentor:', error);
        throw error; 
    }
};

// Function to get students for a mentor
const getStudentsForMentor = async (mentorId) => {
    try {
        const response = await fetch(`https://mentor-student-backend-5pk5.onrender.com/api/mentors/${mentorId}/students`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Students:', error);
        throw error;
    }
};
});
