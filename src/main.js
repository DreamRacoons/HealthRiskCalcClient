async function start(){
    const response = await fetch("https://health-ins-risk-math.azurewebsites.net/")
    const data = await response.json()
}
 
start()
 
function calculateRisk() {
    const age = parseFloat(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const systolicBP = parseFloat(document.getElementById("systolicBP").value);
    const diastolicBP = parseFloat(document.getElementById("diastolicBP").value);
    const diabetes = document.getElementById("diabetes").value;
    const cancer = document.getElementById("cancer").value;
    const alzheimers = document.getElementById("alzheimers").value;
 
    // Calculate BMI
    const bmi = (weight / (height * height)) * 703;
 
    // Initialize risk scores
    let ageScore = 0;
    let bmiScore = 0;
    let bpScore = 0;
    let familyHistoryScore = 0;
 
    // Calculate risk scores
    if (age < 30) {
        ageScore = 0;
    } else if (age >= 30 && age <= 45) {
        ageScore = 10;
    } else {
        ageScore = 20;
    }
 
    if (bmi < 24.9) {
        bmiScore = 0;
    } else if (bmi >= 24.9 && bmi <= 29.9) {
        bmiScore = 10;
    } else {
        bmiScore = 30;
    }
 
    if (systolicBP < 120 && diastolicBP < 80) {
        bpScore = 0;
    } else {
        bpScore = 15;
    }
 
    if (diabetes === "y") {
        familyHistoryScore += 10;
    }
    if (cancer === "y") {
        familyHistoryScore += 10;
    }
    if (alzheimers === "y") {
        familyHistoryScore += 10;
    }
 
    // Calculate total risk score
    const totalScore = ageScore + bmiScore + bpScore + familyHistoryScore;
 
    // Determine risk level
    let riskLevel = "";
    if (totalScore === 0) {
        riskLevel = "low-risk";
    } else if (totalScore <= 30) {
        riskLevel = "moderate-risk";
    } else {
        riskLevel = "high-risk";
    }
 
    // Display results
    document.getElementById("ageScore").textContent = ageScore;
    document.getElementById("bmiScore").textContent = bmiScore;
    document.getElementById("bmiValue").textContent = bmi.toFixed(2);
    document.getElementById("bpScore").textContent = bpScore;
    document.getElementById("familyHistoryScore").textContent = familyHistoryScore;
    document.getElementById("riskLevel").textContent = riskLevel;
    document.getElementById("result").style.display = "block";
}
 
function addAnotherPatient() {
    document.getElementById("patientForm").reset();
    document.getElementById("result").style.display = "none";
}