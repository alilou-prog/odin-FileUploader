import { Link } from "react-router-dom"
import "./styles/index.css"

function App() {
  return (
    <>
      <h1>Home page</h1>
      <nav className="actions">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </>
  )
}

export default App
