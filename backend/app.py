from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
from difflib import get_close_matches
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to call backend APIs

# Load your trained model
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Load dataset for job titles and average salary
try:
    salary_df = pd.read_csv("Salary Data.csv")
    salary_df = salary_df.dropna()
    unique_job_titles = sorted(salary_df["Job Title"].dropna().unique())
    print(f"✅ Dataset loaded with {len(salary_df)} records and {len(unique_job_titles)} unique job titles")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    salary_df = pd.DataFrame()
    unique_job_titles = []

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Employee Salary Predictor API",
        "status": "running",
        "endpoints": ["/job-titles", "/predict", "/average-salary"]
    })

@app.route("/job-titles", methods=["GET"])
def get_job_titles():
    return jsonify({"job_titles": unique_job_titles})

@app.route("/predict", methods=["POST"])
def predict_salary():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.json
        print("Received Data:", data)

        # Validate & cast numeric fields
        experience = float(data.get("Years of Experience", 0))
        age = float(data.get("Age", 0))
        
        if not (0 <= experience <= 25):
            return jsonify({"error": "Experience must be between 0 and 25."}), 400
        if not (23 <= age <= 53):
            return jsonify({"error": "Age must be between 23 and 53."}), 400

        job_title = str(data.get("Job Title", "")).strip()
        if job_title not in unique_job_titles:
            closest = get_close_matches(job_title, unique_job_titles, n=1, cutoff=0.6)
            if closest:
                job_title = closest[0]  # Use closest match
            else:
                return jsonify({"error": "Invalid Job Title."}), 400

        input_data = pd.DataFrame([{
            "Years of Experience": experience,
            "Education Level": str(data.get("Education Level", "")).strip(),
            "Job Title": job_title,
            "Gender": str(data.get("Gender", "")).strip(),
            "Age": age
        }])

        print("Input DataFrame for Model:\n", input_data)

        # Predict salary
        predicted_salary = model.predict(input_data)[0]
        return jsonify({"predicted_salary": round(predicted_salary, 2)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 400

@app.route("/average-salary", methods=["POST"])
def average_salary():
    try:
        if salary_df.empty:
            return jsonify({"error": "Dataset not loaded"}), 500
            
        data = request.json
        job_title = str(data.get("Job Title", "")).strip()

        if job_title not in unique_job_titles:
            closest = get_close_matches(job_title, unique_job_titles, n=1, cutoff=0.6)
            if closest:
                job_title = closest[0]
            else:
                return jsonify({"error": "Invalid Job Title."}), 400

        avg_salary = salary_df[salary_df["Job Title"] == job_title]["Salary"].mean()
        if pd.isna(avg_salary):
            avg_salary = 0

        return jsonify({"average_salary": round(avg_salary, 2)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    print("🚀 Starting Employee Salary Predictor Backend")
    print("📊 Available endpoints:")
    print("  - GET  /job-titles")
    print("  - POST /predict") 
    print("  - POST /average-salary")
    print("🌐 Server running on http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
