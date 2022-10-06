import Navbar from "../Components/Navbar"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Aktivitetsdetalje.css"
const Aktivitetsdetalje = () => {

  let params = useParams()

  console.log(params)

  const [loadingactivities, setLoadingactivities] = useState(true)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities/' + params.id)
      .then(response => response.json())
      .then(data => {
        setLoadingactivities(false)
        setAssets(data)
      })
  }, [params.id])

  console.log("this is params id: " + params.id)

  console.log("this is assets: " + assets)

  return (
    <div className="containerbg mainbg">
      {loadingactivities ? <h1>Loading...</h1> :
        <>
          <div className="aktivitetsdetalje">
            <div className="aktivitetsdetalje-item">

            {/* <img src={assets.asset.url} className="aktivitetsdetalje-item-img" alt="" /> */}

              <div className="tildmeldt-grid">
                <img src={assets.asset.url} className="aktivitetsdetalje-item-img" alt="" />
                <div className="tildmeldt-grid-btn">Tilmeld</div>
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