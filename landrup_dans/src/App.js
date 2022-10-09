import splash from './assets/splash-image.jpg'
import './App.css'

function App() {
  return (
    <div className="App">

      <div className='hero1'>
        <div className="placementgrid">
          <h1 className="hero1-h1">LANDRUP</h1>
          <span className='hero1-h2-span'>DANS</span>
          <hr className='hero1-h2-hr'></hr>
        </div>

        <a className='hero2-link font18' href='Aktiviteter'>Kom i gang</a>
        <img src={splash} className="bg-top" alt='' />
      </div>
    </div>
  )
}

export default App