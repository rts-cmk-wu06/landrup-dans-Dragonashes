import navicon1 from '../assets/Group 1.svg'
import navicon2 from '../assets/Group 2.svg'
import navicon3 from '../assets/Group 3.svg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">
        <img src={navicon1} className="navbar-logo" alt="" />
      </a>
      <a href="Aktiviteter">
        <img src={navicon2} className="navbar-logo" alt="" />
      </a>
      <a href="Kalender">
        <img src={navicon3} className="navbar-logo" alt="" />
      </a>
    </nav>
  )
}

export default Navbar