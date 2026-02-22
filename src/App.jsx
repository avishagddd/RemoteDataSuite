import { useState } from 'react'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [page, setPage] = useState('dashboard')

  if (page === 'login') return <Login onLogin={() => setPage('dashboard')} />
  return <Dashboard onLogout={() => setPage('login')} />
}

export default App
