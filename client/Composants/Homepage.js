import '../Styles/Homepage.css'
import logo from '../Assets/logo.png'
import contour_btn from '../Assets/contour_btn.png'
import deco from '../Assets/deco.png'


function Homepage() {  
  return (
      <div>
      <img src= {logo} className = 'logo'/>
      <img src= {contour_btn} className = "contour_btn"/>
      <img src= {deco} className = "deco"/>
      <div className='text'>
        <h1 className='title'>MEME - ORABLE</h1>
        <p className='noms'>Ewan - Pierre Louis - Maëlle - Hugo - Maxime - Martin</p>
      </div>
      <div className="button-container">
        <button className="button">S'inscrire</button>
        <button className="button">Log In</button>
      </div>
    </div>
      )
}

export default Homepage