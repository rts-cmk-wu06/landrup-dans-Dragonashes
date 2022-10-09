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

  const [Instructor, setInstructor] = useState(false)
  axios.get('http://localhost:4000/api/v1/users/' + userselected, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      console.log(response.data.role)
      if (response.data.role === 'instructor') {
        setInstructor(true)
      }
    })


  // /api/v1/activities

  const [Activities, setActivities] = useState([])

  useEffect(() => {
  axios.get('http://localhost:4000/api/v1/activities', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      setActivities(response.data)
    })
  }, [])

    console.log(Activities)

  return (
    <div className="containerbg mainbg">

      <div>

        {/* <div className="font36">Kalender</div> */}

        <h1 className="titlegrid titlegrid-soegeside">
          <span className="titlegrid-item1 font36">Kalender</span>
        </h1>

        <div className="itemgrid">

          {Instructor ? <div className="instructortext font18">Instructor panel</div> :

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