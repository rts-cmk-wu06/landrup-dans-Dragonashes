import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Aktiviteter from './Pages/Aktiviteter'
import Aktivitetsdetalje from './Pages/Aktivitetsdetalje'
import Soegeside from './Pages/Soegeside'
import Kalender from './Pages/Kalender'
import Kalenderdetalje from './Pages/Kalenderdetalje'
import Login from './Pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Aktiviteter" element={<Aktiviteter />} />
        <Route path="Aktivitetsdetalje/:id" element={<Aktivitetsdetalje />} />
        <Route path="/Soegeside" element={<Soegeside />} />
        <Route path="/Kalender" element={<Kalender />} />
        <Route path="/Kalenderdetalje/:id" element={<Kalenderdetalje />} />
        <Route path="Login" element={<Login />} />
        <Route path="*" element={<div>Empty page</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
