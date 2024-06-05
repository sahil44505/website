import {React} from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();
 
  const isLoggedIn =  localStorage.getItem('token')


  const handleLogout = () => {
      localStorage.removeItem('token')
      navigate("/SignUp")
      
  };
  
  return (
    <div className='navbar'>
      <div className='Roam'>
      {isLoggedIn ? (<button onClick={handleLogout} >Logout</button>) : (<Link to = "/Login">Login</Link>)}
        <Link to ="/SignUp">SignUp</Link>
      </div>
      
        <div className='Links'>

            <Link to="/">Shop</Link>
            <Link to="/Cart"> <ShoppingCart size={20}/></Link>

        </div>
      
    </div>
  )
}

export default Navbar
