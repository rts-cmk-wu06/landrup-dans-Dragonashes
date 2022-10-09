import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import "./Kalender.css"
import axios from "axios"

const Kalender = () => {

  const [assets, setAssets] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/activities')
      .then(response => {
        setAssets(response.data)
      })
  }, [])

  var userselected = localStorage.getItem('userId')

  return (
    <div className="containerbg mainbg">

      <div>

        {/* <div className="font36">Kalender</div> */}

        <h1 className="titlegrid titlegrid-soegeside">
          <span className="titlegrid-item1 font36">Kalender</span>
        </h1>

        <div className="itemgrid">
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
                <a key={index} href={'http://localhost:3000/Aktivitetsdetalje/' + item.id} className="testitem">
                  <div className="font36 testitempreventoverflow">{item.name}</div>
                  <div className="font18 testitemresize">{item.weekday} {item.time}</div>
                </a>
              )
            })
          }
        </div>
      </div>

      <Navbar />
    </div>
  )
}

export default Kalender