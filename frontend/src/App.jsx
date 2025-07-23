import SalaryForm from "./components/SalaryForm"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">💼 Employee Salary Predictor</h1>
        <p className="text-lg opacity-90">Predict salaries based on your professional profile</p>
        <div className="mt-4 text-sm opacity-75">
          <span className="bg-white/20 px-3 py-1 rounded-full">🤖 AI-Powered Predictions</span>
        </div>
      </header>

      <main className="flex-1 p-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Get Your Salary Estimate</h2>
            <p className="text-gray-600">
              Enter your details below to get an AI-powered salary prediction based on market data
            </p>
          </div>
          <SalaryForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
