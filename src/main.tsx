import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { upgradeHashRoute } from "./utils/site"

upgradeHashRoute()

const root = document.getElementById("root")!
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The English home page arrives prerendered (scripts/prerender.mjs): take over that
// markup instead of drawing it again. Every other page and language renders here.
if (root.firstElementChild) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
