import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"

const Kalender = () => {

  const [assets, setAssets] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        setAssets(response)
      })
  }, [])

  var userselected = localStorage.getItem('userId')

  return (
    <>
      {
        assets.filter((item) => {
          for (var i = 0; i < item.users.length; i++) {
            if (item.users[i].id == userselected) {
              return true
            }
          }
          return false
        }).map((item, index) => {
          return (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.weekday}</p>
              <p>{item.time}</p>
              <a href={'http://localhost:3000/Kalenderdetalje/' + item.id}>{item.id} link</a>
            </div>
          )
        })
      }

      <Navbar />
    </>
  )
}

export default Kalender