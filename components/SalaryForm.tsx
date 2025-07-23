"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react"
import SalaryResult from "./SalaryResult"
import SalaryChart from "./SalaryChart"

// Use only the Render deployed backend
const API_BASE_URL = "https://backend-salary-predicter.onrender.com"

export default function SalaryForm() {
  const [formData, setFormData] = useState({
    experience: "",
    education: "",
    jobTitle: "",
    gender: "",
    age: "",
  })
  const [jobTitles, setJobTitles] = useState<string[]>([])
  const [prediction, setPrediction] = useState<number | null>(null)
  const [chartData, setChartData] = useState<{ actual: number; predicted: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "disconnected">("checking")

  const checkBackend = async () => {
    setBackendStatus("checking")
    setError("")

    try {
      console.log(`Connecting to Render backend: ${API_BASE_URL}`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout for Render

      const response = await fetch(`${API_BASE_URL}/job-titles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        setJobTitles(data.job_titles || [])
        setBackendStatus("connected")
        setError("")
        console.log(`✅ Connected to Render backend successfully`)
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (err) {
      console.error(`❌ Failed to connect to Render backend:`, err)
      setBackendStatus("disconnected")

      if (err instanceof Error && err.name === "AbortError") {
        setError("Connection timeout. The Render backend may be starting up (cold start). Please wait and try again.")
      } else {
        setError("Unable to connect to the Render backend. The service may be starting up or temporarily unavailable.")
      }
    }
  }

  useEffect(() => {
    checkBackend()
  }, [])

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPrediction(null)
    setChartData(null)
    setError("")

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Years of Experience": Number.parseFloat(formData.experience),
          "Education Level": formData.education,
          "Job Title": formData.jobTitle,
          Gender: formData.gender,
          Age: Number.parseFloat(formData.age),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Prediction failed")
      }

      const data = await response.json()
      const predictedSalary = data.predicted_salary
      setPrediction(predictedSalary)

      // Try to get average salary for comparison
      try {
        const avgResponse = await fetch(`${API_BASE_URL}/average-salary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ "Job Title": formData.jobTitle }),
        })

        if (avgResponse.ok) {
          const avgData = await avgResponse.json()
          setChartData({
            actual: avgData.average_salary,
            predicted: predictedSalary,
          })
        }
      } catch (avgError) {
        console.warn("Could not fetch average salary for comparison")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while predicting salary"
      setError(errorMessage)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-700">Enter Your Details</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {backendStatus === "connected" ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : backendStatus === "disconnected" ? (
              <WifiOff className="w-4 h-4 text-red-500" />
            ) : (
              <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
            )}
            <span
              className={
                backendStatus === "connected"
                  ? "text-green-600"
                  : backendStatus === "disconnected"
                    ? "text-red-600"
                    : "text-yellow-600"
              }
            >
              {backendStatus === "connected"
                ? "🚀 Render Backend Connected"
                : backendStatus === "disconnected"
                  ? "❌ Render Backend Disconnected"
                  : "🔄 Connecting to Render..."}
            </span>
          </div>

          {backendStatus === "disconnected" && (
            <Button
              variant="outline"
              size="sm"
              onClick={checkBackend}
              className="flex items-center gap-1 bg-transparent"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Backend:</strong> {API_BASE_URL}
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {backendStatus === "checking" && (
          <Alert className="mb-4 border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800">
              <strong>Connecting to Render backend...</strong> This may take a moment if the service is starting up
              (cold start).
            </AlertDescription>
          </Alert>
        )}

        {backendStatus === "disconnected" && (
          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              <strong>Render backend unavailable.</strong> The service may be starting up or experiencing issues.
              <br />
              Please wait a moment and click "Retry" to reconnect.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="25"
                step="0.5"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="e.g., 5"
                required
              />
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="23"
                max="53"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="e.g., 30"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="education">Education Level</Label>
            <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Education Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                <SelectItem value="Master's">Master's</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="e.g., Software Engineer"
              list="jobTitles"
              required
            />
            <datalist id="jobTitles">
              {jobTitles.map((title, index) => (
                <option key={index} value={title} />
              ))}
            </datalist>
            <p className="text-sm text-gray-500 mt-1">
              {backendStatus === "connected" && jobTitles.length > 0
                ? `${jobTitles.length} job titles loaded from Render`
                : backendStatus === "connected"
                  ? "Loading job titles from Render..."
                  : "Connect to Render backend to load job titles"}
            </p>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading || backendStatus !== "connected"} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />🚀 Predicting with Render ML Model...
              </>
            ) : (
              "🤖 Predict Salary"
            )}
          </Button>
        </form>

        {prediction && <SalaryResult salary={prediction} />}
        {chartData && <SalaryChart data={chartData} />}
      </CardContent>
    </Card>
  )
}
