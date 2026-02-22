import { useState } from 'react'
import './Login.css'

const DATASUITE_IDS = ['DS-2024-001', 'DS-2024-002', 'DS-2024-003']

function FourtecLogo() {
  return (
    <svg
      className="login-logo"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fourtec logo"
    >
      <path d="M27.0013 1.90565C13.1626 1.90565 1.90509 13.1621 1.90509 26.9994C1.90509 40.8379 13.1626 52.0943 27.0013 52.0943C40.8374 52.0943 52.0949 40.8379 52.0949 26.9994C52.0955 13.1621 40.8374 1.90565 27.0013 1.90565ZM27.0013 54C12.113 54 0 41.8872 0 26.9994C0 12.114 12.1124 0 27.0013 0C41.887 0 54 12.114 54 26.9994C54 41.8872 41.8876 54 27.0013 54Z" fill="#8CC24E"/>
      <path d="M31.035 24.7592H35.5846C36.6445 24.7592 37.5019 25.6181 37.5019 26.676V29.1301C37.5019 30.188 36.6445 31.0481 35.5846 31.0481H31.035C29.9777 31.0481 29.119 30.188 29.119 29.1301V26.676C29.119 25.6174 29.9777 24.7592 31.035 24.7592Z" fill="#8CC24E"/>
      <path d="M21.2643 46.5827C20.2057 46.5827 19.3419 45.7226 19.3419 44.6647V31.0475H17.0651C16.0078 31.0475 15.1504 30.1874 15.1504 29.1295V26.6754C15.1504 25.615 16.0078 24.7586 17.0651 24.7586H19.3419V16.9227C19.3419 15.8647 20.198 15.0059 21.2579 15.0059H24.9277C25.7011 15.0059 26.333 14.3839 26.333 13.6135L26.3343 11.3597C26.3343 10.2993 27.1916 9.44168 28.2502 9.44168H35.5931C36.6505 9.44168 37.5021 10.2993 37.5021 11.3597V13.8138C37.5021 14.8693 36.6447 15.7293 35.5848 15.7293H27.7299C26.959 15.7293 26.333 16.3551 26.333 17.128V44.6647C26.333 45.7226 25.4769 46.5827 24.4183 46.5827H21.2643Z" fill="#0060A8"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#535862" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Login({ onLogin }) {
  const [dataSuiteId, setDataSuiteId] = useState('DS-2024-001')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onLogin?.()
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <form className="login-content" onSubmit={handleSubmit} noValidate>

          {/* Header */}
          <div className="login-header">
            <FourtecLogo />
            <div className="login-title-group">
              <h1 className="login-title">Remote DataSuite</h1>
              <p className="login-subtitle">Welcome back! Please enter your details.</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="login-form-body">
            <div className="login-fields">

              {/* DataSuite ID – dropdown */}
              <div className="field-group">
                <label className="field-label" htmlFor="datasuite-id">
                  DataSuite ID
                </label>
                <div className="select-wrapper">
                  <select
                    id="datasuite-id"
                    className="field-select"
                    value={dataSuiteId}
                    onChange={(e) => setDataSuiteId(e.target.value)}
                  >
                    {DATASUITE_IDS.map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                  <span className="select-chevron" aria-hidden="true">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Username */}
              <div className="field-group">
                <label className="field-label" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="field-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="field-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Login button */}
            <div className="login-actions">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
