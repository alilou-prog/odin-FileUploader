import { Link } from "react-router-dom"
import "./styles/index.css"

function App() {
  async function test_session() {
    const res = await fetch('/api/session-test')
    const json = await res.json()
    if(json.status) {
      console.log(json.session)
    }
    else {
      console.log(json.err)
    }
  }
  return (
    <>
      <h1>Home page</h1>
      <nav className="actions">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <button onClick={test_session}>test session</button>
      </nav>
    </>
  )
}

export default App
