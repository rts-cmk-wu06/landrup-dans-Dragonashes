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
    <>
      {Loading ? <h1>Loading...</h1> :
        <>
          <h1>Aktiviteter</h1>
          <div className="aktiviteter">
            {classes.map((item, index) => {
              return (
                <a href={link + item.id} key={index} className="aktiviteter-item">
                  <img src={item.asset.url} className="aktiviteter-item-img" alt="" />
                  <div className="aktiviteter-item-2">{item.name}</div>
                  <div className="aktiviteter-item-3">{item.minAge}-{item.maxAge} år</div>
                </a>
              )
            })}
          </div>
        </>
      }
    </>
  )
}

export default Aktiviteter