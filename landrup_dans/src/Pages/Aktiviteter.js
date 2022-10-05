import { useState, useEffect } from "react"
import './Aktiviteter.css'

const Aktiviteter = () => {

  const [classes, setAktiviteter] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities')
      .then(response => response.json())
      .then(data => {
        setAktiviteter(data)
        setLoading(false)
      })
  }, [])

  var link = 'http://localhost:3000/Aktiviteter/'

  return (
    <div className="mainbg">
      {Loading ? <h1>Loading...</h1> :
        <>
          <h1 className="titlegrid">
            <span className="titlegrid-item1 font36">&nbsp;Aktiviteter</span>

          </h1>
          <div className="aktiviteter">
            {classes.map((item, index) => {
              return (
                <a href={link + item.id} key={index} className="aktiviteter-item">
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
    </div>
  )
}

export default Aktiviteter