import './Login.css'
import { useState, createRef } from "react"
import { useNavigate } from "react-router-dom"
import splash from '../assets/splash-image.jpg'
import axios from 'axios'

const Login = () => {

  const [loading, setLoading] = useState(false)

  let username = createRef()
  let password = createRef()

  const [loginError, setLoginError] = useState(undefined)

  let navigate = useNavigate()

  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)
    axios.post('http://localhost:4000/auth/token', {
      username: username.current.value,
      password: password.current.value
    })
      .then((response) => {

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        navigate('/Kalender')
        axios.get('http://localhost:4000/api/v1/users/' + localStorage.getItem('userId'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
          localStorage.setItem('username', response.data.username)
        })
      })
      .catch((error) => {

        setLoginError(true)
        setLoading(false)
        document.querySelector('.login-form').reset() // required
        throw new Error('Unauthorized')
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
      {!token ? (
        <div className="loginbg">

          <img src={splash} alt="" className="loginsplash" />

          {/* <div className='colorbox'></div> */}

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
            {loginError && <div className='unautheduser'>Unauthorized user!</div>}
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