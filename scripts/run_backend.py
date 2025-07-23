import subprocess
import sys
import os
import time

def install_requirements():
    """Install required packages"""
    requirements = [
        "flask",
        "flask-cors", 
        "numpy",
        "pandas",
        "scikit-learn==1.7.0"
    ]
    
    print("🔧 Installing Python packages for ML model...")
    for package in requirements:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package], 
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f"✅ Installed {package}")
        except subprocess.CalledProcessError:
            print(f"❌ Failed to install {package}")

def run_flask_app():
    """Run the Flask application"""
    print("\n🐍 Starting Python Flask Backend with ML Model...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🤖 Loading trained scikit-learn model...")
    print("🔄 Starting in 3 seconds...")
    time.sleep(3)
    
    # Change to backend directory
    backend_dir = os.path.join(os.getcwd(), "backend")
    if not os.path.exists(backend_dir):
        print(f"❌ Backend directory not found: {backend_dir}")
        return
    
    os.chdir(backend_dir)
    
    # Check if required files exist
    required_files = ["app.py", "model.pkl", "Salary Data.csv"]
    for file in required_files:
        if not os.path.exists(file):
            print(f"❌ Required file not found: {file}")
            return
        else:
            print(f"✅ Found {file}")
    
    # Set environment variables
    os.environ["FLASK_APP"] = "app.py"
    os.environ["FLASK_ENV"] = "development"
    
    try:
        print("\n🚀 Starting Flask server with ML model...")
        # Run Flask app
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n🛑 Python Flask server stopped by user")
    except Exception as e:
        print(f"❌ Error running Flask app: {e}")

if __name__ == "__main__":
    print("=" * 70)
    print("🏢 EMPLOYEE SALARY PREDICTOR - PYTHON ML BACKEND")
    print("=" * 70)
    print("🤖 This will start the Python Flask server with the trained ML model")
    print("📊 The model uses scikit-learn for salary predictions")
    print("🔬 Features: OneHotEncoder + Linear Regression")
    print("=" * 70)
    
    install_requirements()
    print("\n" + "=" * 70)
    run_flask_app()
