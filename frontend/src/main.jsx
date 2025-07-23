import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root")

  if (!container) {
    console.error("Root element with id 'root' not found in the DOM")
    return
  }

  const root = createRoot(container)
  root.render(<App />)
})

// Fallback if DOMContentLoaded already fired
if (document.readyState === "loading") {
  // DOM is still loading, event listener will handle it
} else {
  // DOM is already loaded
  const container = document.getElementById("root")

  if (container) {
    const root = createRoot(container)
    root.render(<App />)
  } else {
    console.error("Root element with id 'root' not found in the DOM")
  }
}
