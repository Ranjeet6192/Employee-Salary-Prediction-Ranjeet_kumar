# 💼 Employee Salary Prediction

An end-to-end machine learning web application for predicting employee salaries based on candidate data. Built with **Next.js** frontend, a **Node.js backend**, and a trained ML model integrated via Python.

---

## 🚀 Project Overview

This project uses historical data (experience, test scores, interview scores) to train a machine learning model that can accurately predict employee salaries. It offers a sleek, web-based UI built with modern JavaScript frameworks and integrates a trained Python model via backend APIs.

---

## 🧠 Tech Stack

### Frontend
- ⚡ Next.js (React)
- ✨ Tailwind CSS
- 🌈 TypeScript

### Backend
- 🌐 Node.js + Express
- 📦 REST API
- 🔁 Integration with Python ML model

### ML & Data Science
- 🐍 Python (Jupyter Notebook)
- 📊 Pandas, NumPy, Scikit-learn
- 📁 Model stored as `.pkl`

---

## 📂 Project Structure

```
.
├── frontend/                        # Next.js frontend
│   ├── components/                 # React components
│   ├── lib/                        # Utility libraries
│   ├── public/                     # Static assets
│   ├── styles/                     # Tailwind CSS setup
│   ├── pages/                      # App routes
│   └── next.config.mjs            # Next.js config

├── backend/                         # Node.js + Express backend
│   ├── scripts/                   # Python model integration
│   ├── routes/                    # API endpoints
│   └── server.js / index.js       # Main backend server

├── Employee Salary Predictor model.ipynb  # Model training notebook
├── Salary Data.csv                        # Training dataset
├── model.pkl                              # Serialized model
├── package.json / tsconfig.json           # Project configs
└── README.md                              # You are here!
```

---

## 🔧 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/Ranjeet6192/Employee-Salary-Prediction-Ranjeet_kumar.git
cd Employee-Salary-Prediction-Ranjeet_kumar
```

### 2. Install dependencies
```bash
pnpm install   # or npm install if not using pnpm
```

### 3. Start the development servers

#### ✅ Start the backend server (Express + Python)
```bash
cd backend
node server.js
```

Make sure your Python environment is ready with the ML model and necessary packages:
```bash
cd scripts
python3 run_model.py  # or however your script is invoked
```

#### 🎨 Start the frontend (Next.js)
```bash
cd frontend
pnpm dev   # or npm run dev
```


---

## 📊 ML Model Overview

- **Model Type**: Linear Regression
- **Input Features**:
  - Years of Experience
  - Test Score (out of 10)
  - Interview Score (out of 10)
- **Output**: Predicted Salary (₹)
- **Serialized as**: `model.pkl`

You can retrain it using the Jupyter notebook: `Employee Salary Predictor model.ipynb`

---

## 🌐 Deployment Ideas

- Deploy frontend on [Vercel](https://vercel.com/)
- Use [Render](https://render.com/) or [Railway](https://railway.app/) for the Node backend + Python integration
- Host `model.pkl` and use Flask/FastAPI wrapped in the backend server

---

## 💡 Future Improvements

- Add loading states & validation to frontend
- Use FastAPI instead of Express+Python shell execution for better API speed
- Add Docker setup for full containerization
- Add CI/CD (GitHub Actions)

---

## 🧠 Author

**Ranjeet Kumar**  
[GitHub Profile](https://github.com/Ranjeet6192)

---

## 📜 License

Licensed under the **MIT License** — use it freely, fork it, deploy it, and go wild 🔥

---
