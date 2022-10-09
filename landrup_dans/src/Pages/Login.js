import './Login.css'
import { useState, createRef } from "react"
import { useNavigate } from "react-router-dom"

import splash from '../assets/splash-image.jpg'

const Login = () => {

  let username = createRef()
  let password = createRef()

  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(undefined)

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    fetch('http://localhost:4000/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${username.current.value}&password=${password.current.value}`
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        setLoginError(true)
        throw new Error('Unauthorized')
      }
    }).then((data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('username', username)
      navigate("/Kalender")

      fetch('http://localhost:4000/api/v1/users/' + localStorage.getItem('userId'),
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Unauthorized')
          }
        }).then((data2) => {
          localStorage.setItem('username', data2.username)
        })
    }).catch((error) => {
      setLoading(false)
      document.querySelector('.login-form').reset() // required
    })

  }

  const Logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('userId')
    navigate("/Aktiviteter")
  }

  return (
    <>
      {!localStorage.getItem('token') ? (
        <div className="loginbg">

          <img src={splash} alt="" className="loginsplash" />

          {/* <div className='colorbox'></div> */}

          {loginError && <div>Unauthorized user!</div>}
          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <h1 className='login-title'>Log ind</h1>
            <label className='login-form-username'></label>
            <input
              type="text"
              id="username"
              className="inputsizing"
              placeholder="brugernavn"
              ref={username}
              required
              minLength="5"
              maxLength="11"
            />
            <label className='login-form-password'></label>
            <input
              type="password"
              id="password"
              className="inputsizing"
              placeholder="adgangskode"
              ref={password}
              required
              minLength="4"
              maxLength="4"
              pattern="[0-9]{4}"
            />
            <button
              disabled={loading}
              className="login-form-btn"
            >
              {loading ? 'Loading...' : 'Log ind'}
            </button>
          </form>
        </div>
      ) : (
        <div className="loginbg">
          <h1>Welcome {localStorage.getItem('username')}</h1>
          <button onClick={Logout} className="login-form-btn">Logout</button>
        </div>
      )}
    </>
  )
}

export default Login