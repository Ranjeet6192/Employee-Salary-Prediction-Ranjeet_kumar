import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface SalaryChartProps {
  data: {
    actual: number
    predicted: number
  }
}

export default function SalaryChart({ data }: SalaryChartProps) {
  const maxSalary = Math.max(data.actual, data.predicted)
  const actualPercentage = (data.actual / maxSalary) * 100
  const predictedPercentage = (data.predicted / maxSalary) * 100

  const difference = data.predicted - data.actual
  const percentageDiff = ((difference / data.actual) * 100).toFixed(1)

  const getComparisonIcon = () => {
    if (difference > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (difference < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getComparisonText = () => {
    if (difference > 0) {
      return <span className="text-green-600 font-medium">{percentageDiff}% above market average</span>
    }
    if (difference < 0) {
      return (
        <span className="text-red-600 font-medium">
          {Math.abs(Number.parseFloat(percentageDiff))}% below market average
        </span>
      )
    }
    return <span className="text-gray-600 font-medium">Matches market average</span>
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-center">Salary Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Market Average</span>
              <span className="text-sm font-bold text-green-600">₹{data.actual.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${actualPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your Prediction</span>
              <span className="text-sm font-bold text-blue-600">₹{data.predicted.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${predictedPercentage}%` }}
              />
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              {getComparisonIcon()}
              {getComparisonText()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
