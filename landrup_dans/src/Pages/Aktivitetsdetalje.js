import Navbar from "../Components/Navbar"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Aktivitetsdetalje.css"
const Aktivitetsdetalje = () => {

  let params = useParams()

  const [loadingactivities, setLoadingactivities] = useState(true)
  const [assets, setAssets] = useState([])
  const [Age, setAge] = useState([])
  const [Loadingage, setLoadingage] = useState(true)

  fetch('http://localhost:4000/api/v1/users/6' + userselected,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
      setAge(response.age)
    })

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities/' + params.id)
      .then(response => response.json())
      .then(data => {
        setLoadingactivities(false)
        setAssets(data)
      })
  }, [params.id])

  var userselected = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const [assets2, setAssets2] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities/' + params.id,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        for (var i = 0; i < response.users.length; i++) {
          if (response.users[i].id == userselected) {
            setAssets2(response.users[i].id)
          }
        }
      })
  }, [params.id, userselected])

  function handlepost() {
    if (token !== null) {

      if (Age >= assets.minAge && Age <= assets.maxAge) {
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

  function handledelete() {
    fetch('http://localhost:4000/api/v1/users/' + userselected + '/activities/' + params.id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
  }

  function specialrender() {
    if (!localStorage.getItem('token')) {
      return (
        <div></div>
      )
    } else if (assets2 == userselected) {
      return (
        <form>
          <button type="submit" className="tildmeldt-grid-btn" onClick={handledelete}>Forlad</button>
        </form>
      )
    } else if (assets2 !== userselected) {
      return (
        <form>
          <button type="submit" className="tildmeldt-grid-btn" onClick={handlepost}>Tilmeld</button>
        </form>
      )
    } else {
      return (
        <div>hello</div>
      )
    }
  }

  return (
    <div className="containerbg mainbg">

      {/* {Loadingage ? (<div>Loading...</div>) : (<div>not loading</div>)} */}

      {loadingactivities ? <h1>Loading...</h1> :
        <>
          <div className="aktivitetsdetalje">
            <div className="aktivitetsdetalje-item">

              <div className="tildmeldt-grid">
                <img src={assets.asset.url} className="aktivitetsdetalje-item-img" alt="" />

                {specialrender()}

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
          </div>
        </>
      }
      <Navbar />
    </div>
  )
}

export default Aktivitetsdetalje