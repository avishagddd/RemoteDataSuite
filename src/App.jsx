import { useState } from 'react'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="phone-frame">
      {page === 'login'
        ? <Login onLogin={() => setPage('dashboard')} />
        : <Dashboard onLogout={() => setPage('login')} />
      }
    </div>
  )
}

export default App
