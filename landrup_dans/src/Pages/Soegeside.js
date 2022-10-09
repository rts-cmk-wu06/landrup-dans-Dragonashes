import Navbar from "../Components/Navbar"
import './Soegeside.css'
import magnifyingglass from '../assets/magnifying-glass.svg'
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

const Soegeside = () => {

  const [Aktiviteter, setAktiviteter] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/activities')
      .then(response => {
        setAktiviteter(response.data)
        setLoading(false)
      })
  }, [])

  var searchdb2 = []
  Aktiviteter.forEach(function (value) {
    searchdb2.push(value.name)
    searchdb2.push(value.weekday)
  })

  let [searchParams, setSearchParams] = useSearchParams()

  var searchdb3 = searchdb2.filter(function (item) {
    return item != null
  })

  return (
    <div className="containerbg mainbg">

      <div className="container-item1">

        <h1 className="titlegrid titlegrid-soegeside">
          <span className="titlegrid-item1 font36">Søg</span>
        </h1>

        <div className="searchgrid">
          <input
            type="search"
            list="searchdb"
            className="searchstyle"
            value={searchParams.get("filter") || ""}
            onChange={e => {
              let filter = e.target.value
              if (filter) {
                setSearchParams({ filter })
              } else {
                setSearchParams({})
              }
            }}
          />
          <datalist id="searchdb">
            {searchdb3.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
          <div className="magnifyingglassitem">
            <img src={magnifyingglass} className="magnifyingglass" alt='' />
          </div>
        </div>



        {Loading ? <h1>Loading...</h1> :
          <>
            <div className="aktiviteter">

              {
                searchParams.get("filter") ? (
                  searchdb3
                    .filter(item => {
                      let filter = searchParams.get("filter")
                      if (!filter) return true
                      let name = item.toLowerCase()
                      return name.startsWith(filter.toLowerCase())
                    })
                    .map(item => (
                      <div key={item} className="searchResultItem">{item}</div>
                    ))
                ) : (
                  <></>
                )
              }

              {Aktiviteter.map((item, index) => {
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
      </div>
      <Navbar />
    </div>
  )
}

export default Soegeside