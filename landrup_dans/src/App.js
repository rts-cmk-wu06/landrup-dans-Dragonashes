import splash from './assets/splash-image.jpg'
// import navicon1 from './assets/Group 1.svg'
// import navicon2 from './assets/Group 2.svg'
// import navicon3 from './assets/Group 3.svg'
import './App.css'

function App() {
  return (
    <div className="App">

      <div className='hero1'>
        {/* <h1 className="hero1-h1">LANDRUP</h1>
        <h2 className='hero1-h2'>
          <span className='hero1-h2-span'>&nbsp; DANS</span>
          <hr className='hero1-h2-hr'></hr>
        </h2> */}

        <div className="placementgrid">
          <h1 className="hero1-h1">LANDRUP</h1>
          {/* &nbsp; */}
          <span className='hero1-h2-span'>DANS</span>
          <hr className='hero1-h2-hr'></hr>
        </div>

        <a className='hero2-link font18' href='Aktiviteter'>Kom i gang</a>
        <img src={splash} className="bg-top" alt='' />
      </div>
      {/* <div className='hero2'>
        <img src={center} className="hero2-img" alt='' />
        <a className='hero2-link' href='Aktiviteter'>Kom i gang</a>
      </div> */}

      {/*
      <div className="testclass">hello</div>
      <a href="Aktiviteter">Kom i gang</a>
      <img src={splash} className="App-logo" alt="logo" />

      <img src={navicon1} className="App-logo" alt="logo" />
      <img src={navicon2} className="App-logo" alt="logo" />
      <img src={navicon3} className="App-logo" alt="logo" /> */}

    </div>
  )
}

export default App