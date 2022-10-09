import Navbar from "../Components/Navbar"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Aktivitetsdetalje.css"
import axios from 'axios'

const Aktivitetsdetalje = () => {

  var userselected = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const [Age, setAge] = useState([])

  axios.get('http://localhost:4000/api/v1/users/' + userselected, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      setAge(response.data.age)
    })

  let params = useParams()

  const [loadingactivities, setLoadingactivities] = useState(true)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/activities/' + params.id)
      .then(response => {
        setLoadingactivities(false)
        setAssets(response.data)
      })
  }, [params.id])

  const [assets2, setAssets2] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/activities/' + params.id)
      .then(response => {
        for (var i = 0; i < response.data.users.length; i++) {
          if (response.data.users[i].id == userselected) {
            setAssets2(response.data.users[i].id)
          }
        }
      })

  }, [params.id, userselected])

  function handleLeaveActivity() {
    axios.delete('http://localhost:4000/api/v1/users/' + userselected + '/activities/' + params.id, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {console.log(response)})
  }

  function handleJoinActivity() {
    if (token !== null) {
      if (Age >= assets.minAge && Age <= assets.maxAge) {
        // dosent work with axios
        fetch('http://localhost:4000/api/v1/users/' + userselected + '/activities/' + params.id,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => response.json())
      } else {
        console.log("user is not old enough to attend activity")
      }
    } else if (token === null) {
      console.log('Please login first')
    }
  }

  function renderActivityButton() {
    if (!localStorage.getItem('token')) {
      return (
        <></>
      )
    } else if (assets2 == userselected) {
      return (
        <form>
          <button className="tildmeldt-grid-btn" onClick={handleLeaveActivity}>Forlad</button>
        </form>
      )
    } else if (assets2 !== userselected) {
      return (
        <form>
          <button className="tildmeldt-grid-btn" onClick={handleJoinActivity}>Tilmeld</button>
        </form>
      )
    }
  }

  return (
    <div className="containerbg mainbg">

      {loadingactivities ? <h1>Loading...</h1> :
        <div>

          <div className="tildmeldt-grid">
            <img src={assets.asset.url} className="aktivitetsdetalje-item-img" alt="" />

            {renderActivityButton()}

          </div>

          <div className="aktivitetsdetalje-item-infobar">
            <div className="aktivitetsdetalje-item-infobar-text1 font24">{assets.name}</div>
            <div className="aktivitetsdetalje-item-infobar-text2 font18">{assets.minAge}-{assets.maxAge} år</div>

            <div className="aktivitetsdetalje-item-infobar-text3 font18">
              {assets.description}
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Eget elementum lorem nulla
              vitae felis auctor pretium suspendisse et.
              Condimentum fringilla odio vitae interdum
              adipiscing odio volutpat. Faucibus gravida
              quis nisi, purus morbi leo nulla a. Mattis
              tincidunt phasellus enim, egestas non
              ultrices.
            </div>

          </div>
        </div>
      }
      <Navbar />
    </div>
  )
}

export default Aktivitetsdetalje