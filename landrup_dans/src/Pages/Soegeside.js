import Navbar from "../Components/Navbar"
import './Soegeside.css'
import magnifyingglass from '../assets/magnifying-glass.svg'
import { useState, useEffect } from "react"

const Soegeside = () => {

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

  var link = 'http://localhost:3000/Aktivitetsdetalje/'

  return (
    <div className="containerbg mainbg">

      {/* <h1 className="titlegrid">
        <span className="titlegrid-item1 font36">Søg</span>
      </h1> */}

      <div className="container-item1">

        {/* <div>Søg</div> */}

        <h1 className="titlegrid titlegrid-soegeside">
          <span className="titlegrid-item1 font36">Søg</span>
        </h1>

        <div className="searchgrid">
          <input
            type="search"
            list="searchdb"
            className="searchstyle"
          // value={searchParams.get("filter") || ""}
          // onChange={e => {
          //   let filter = e.target.value
          //   if (filter) {
          //     setSearchParams({ filter })
          //   } else {
          //     setSearchParams({})
          //   }
          // }}
          />
          <datalist id="searchdb">
            {/* {searchdb3.map((item, index) => (
          <option key={index} value={item} />
          ))} */}
            <option>hello</option>
          </datalist>
          <div className="magnifyingglassitem">
            <img src={magnifyingglass} className="magnifyingglass" alt='' />
          </div>
          {/* <div className="borderitem"></div> */}
        </div>

        {Loading ? <h1>Loading...</h1> :
        <>
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



      <Navbar />
    </div>
  )
}

export default Soegeside