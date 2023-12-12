    document.addEventListener('DOMContentLoaded', () => {
    const createMentorForm = document.getElementById('createMentorForm');
    const createStudentForm = document.getElementById('createStudentForm');
    const assignStudentForm = document.getElementById('assignStudentForm');
    const mentorStudentsList = document.getElementById('mentorStudentsList');

    // Event listener for creating a mentor
    createMentorForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const mentorName = document.getElementById('mentorName').value;

        const mentor = await createMentor(mentorName);
        console.log('Created Mentor:', mentor);
    });

    // Event listener for creating a student
    createStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;

        const student = await createStudent(studentName);
        console.log('Created Student:', student);
    });

    // Event listener for assigning a student to a mentor
    assignStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const mentorId = document.getElementById('mentorId').value;
        const studentId = document.getElementById('studentId').value;

        const assignmentResult = await assignStudentToMentor(mentorId, studentId);
        console.log('Assignment Result:', assignmentResult);
    });

  // Function to get and display students for a mentor
    window.getMentorStudents = async () => {
    const mentorId = prompt('Enter Mentor ID:');
    console.log('Entered Mentor ID:', mentorId); // Debugging line
    if (mentorId) {
        const students = await getStudentsForMentor(mentorId);
        console.log('Fetched Students:', students); // Debugging line
        displayStudents(students);
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


    // Function to create a mentor
    const createMentor = async (mentorName) => {
        const response = await fetch('https://mentor-student-backend-5pk5.onrender.com/api/mentors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: mentorName }),
        });
        return response.json();
    };

    // Function to create a student
    const createStudent = async (studentName) => {
        const response = await fetch('https://mentor-student-backend-5pk5.onrender.com/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: studentName }),
        });
        return response.json();
    };

  // Function to assign a student to a mentor
  const assignStudentToMentor = async (mentorId, studentId) => {
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
    return response.json();
  };
  

    // Function to get students for a mentor
    const getStudentsForMentor = async (mentorId) => {
        const response = await fetch(`https://mentor-student-backend-5pk5.onrender.com/api/mentors/${mentorId}/students`);
        return response.json();
        
    };
});

