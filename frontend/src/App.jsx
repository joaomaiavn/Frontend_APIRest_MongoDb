import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Listagem from './pages/Listagem'

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">API REST</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cadastro">Cadastro</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listagem">Listagem</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/listagem" element={<Listagem />} />
          </Routes>
        </main>

        <footer className="bg-light text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0 text-muted">© 2024 API REST - CRUD de Pessoas</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
