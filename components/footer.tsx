import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <a href="https://dhanu-portfolio-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold">Dhanunjay Burada</a>
          <div className="flex space-x-6">
            <a
              href="https://github.com/DHANUNJAY965/Event_Easy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dhanunjay-burada-908494241/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
