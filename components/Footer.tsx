import { Card, CardContent } from "@/components/ui/card"
import { Heart, Linkedin, Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <Card className="mt-8 bg-gray-50 border-t">
      <CardContent className="text-center py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-current" />
          <span>
            by <strong>Ranjeet Kumar</strong>
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/ranjeet-kumar-7255a2292/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="https://github.com/Ranjeet6192"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-800 hover:text-gray-600 transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="mailto:ranjeetkumar267482@gmail.com"
            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
