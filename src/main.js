async function start(){
    const response = await fetch("https://health-ins-risk-math.azurewebsites.net/api/riskcalcmath")
    const data = await response.json()

    showRisk(data.message)
    
}
 
start()

function showRisk({totalScore, riskLevel, ageScore, bmiScore, bpScore, familyHistoryScore, bmi}){
    document.getElementById("ageScore").textContent = ageScore;
    document.getElementById("bmiScore").textContent = bmiScore;
    document.getElementById("bmiValue").textContent = bmi.toFixed(2);
    document.getElementById("bpScore").textContent = bpScore;
    document.getElementById("familyHistoryScore").textContent = familyHistoryScore;
    document.getElementById("riskLevel").textContent = riskLevel;
    document.getElementById("result").style.display = "block";
}

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
    const bmi = ((weight / (height * height)) * 703);
 
    // Initialize risk scores
    let ageScore = 0;
    let bmiScore = 0;
    let bpScore = 0;
    let familyHistoryScore = 0;
 
    // Calculate risk scores
    if (age < 30) {
        ageScore = 0;
    } else if (age >= 30 && age < 45) {
        ageScore = 10;
    } else if (age >= 45 && age < 60){
        ageScore = 20;
    } else {
        ageScore = 30
    }
 
    if (bmi <= 24.9) {
        bmiScore = 0;
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiScore = 30;
    } else {
        bmiScore = 75;
    }
 
    if (systolicBP < 120 && diastolicBP < 80) {
        bpScore = 0;
    } else if(systolicBP >= 120 && systolicBP < 130 && diastolicBP < 80) {
        bpScore = 15;
    } else if(systolicBP >= 130 && systolicBP < 140 || diastolicBP >= 80 && diastolicBP < 90) {
        bpScore = 30;
    } else if(systolicBP >= 140 && systolicBP < 180 || diastolicBP >= 90 && diastolicBP < 120) {
        bpScore = 75;
    } else {
        bpScore = 100;
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
    if (totalScore <=20) {
        riskLevel = "low-risk";
    } else if (totalScore > 20 && totalScore <= 50) {
        riskLevel = "moderate-risk";
    } else if (totalScore > 50 && totalScore <= 75){
        riskLevel = "high-risk";
    } else {
        riskLevel = "uninsurable"
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