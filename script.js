console.log("Hello World");

function calculateAge() {
    let dobInput = document.getElementById('dob').value;
    if (dobInput) {
        let dob = new Date(dobInput);
        let today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        let monthDiff = today.getMonth() - dob.getMonth();
        
        // Adjust if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        document.getElementById('age').value = age;
    }
}
