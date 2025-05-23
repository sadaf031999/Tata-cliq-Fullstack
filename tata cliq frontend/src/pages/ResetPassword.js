// ResetPassword.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/reset-password/${token}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    })

    const data = await res.json()

    if (data.success) {
      setMessage(data.message)
      setTimeout(() => navigate('/sign-in'), 2000)
    } else {
      setMessage(data.message)
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Enter new password"
          value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPassword
