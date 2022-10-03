import splash from './assets/splash-image.jpg'
import navicon1 from './assets/Group 1.svg'
import navicon2 from './assets/Group 2.svg'
import navicon3 from './assets/Group 3.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <img src={splash} className="App-logo" alt="logo" />

      <img src={navicon1} className="App-logo" alt="logo" />
      <img src={navicon2} className="App-logo" alt="logo" />
      <img src={navicon3} className="App-logo" alt="logo" />

    </div>
  )
}

export default App
