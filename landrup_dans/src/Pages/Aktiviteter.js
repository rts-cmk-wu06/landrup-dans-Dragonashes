import { useState, useEffect } from "react"
import './Aktiviteter.css'
import Navbar from "../Components/Navbar"
import axios from 'axios'

const Aktiviteter = () => {

  const [classes, setAktiviteter] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/activities')
      .then(response => {
        setAktiviteter(response.data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="containerbg mainbg">
      {Loading ? <h1>Loading...</h1> :
        <>
          <div className="aktiviteter">
            <h1 className="titlegrid">
              <span className="titlegrid-item1 font36">&nbsp;Aktiviteter</span>
            </h1>
            {classes.map((item, index) => {
              return (
                <a href={'http://localhost:3000/Aktivitetsdetalje/' + item.id} key={index} className="aktiviteter-item">
                  <img src={item.asset.url} className="aktiviteter-item-img" alt="" />
                  <div className="aktiviteter-item-infobar">
                    <div className="aktiviteter-item-infobar-text1 font18">{item.name}</div>
                    <div className="aktiviteter-item-infobar-text2 font18">{item.minAge}-{item.maxAge} år</div>
                  </div>
                </a>
              )
            })}
          </div>
        </>
      }

      <Navbar />
    </div>
  )
}

export default Aktiviteter