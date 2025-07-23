import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign } from "lucide-react"

interface SalaryResultProps {
  salary: number
}

export default function SalaryResult({ salary }: SalaryResultProps) {
  const usdSalary = (salary / 83).toFixed(2)

  return (
    <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-green-700">
          <TrendingUp className="h-5 w-5" />
          Predicted Salary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            <p className="text-3xl font-bold text-green-700">₹ {salary.toLocaleString()}</p>
          </div>
          <p className="text-sm text-gray-600">per year</p>
          <p className="text-lg text-gray-700">≈ $ {usdSalary} USD / year</p>
        </div>
      </CardContent>
    </Card>
  )
}
