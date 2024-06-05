import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Navbar from './Components/Navbar'
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/LoginSignUp/Login"
import SignUp from "./pages/LoginSignUp/SignUp"
import Cart from "./pages/cart/Cart"
import Shop from "./pages/Shop/Shop"
import ShopcontextProvider from './context/Shop-context'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
function App() {
  

  return (
    <div className='App'>
      <ShopcontextProvider>
      <Router>
        <Navbar/>

        <Routes>
        <Route path="/" element={<Shop/>} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element = {<SignUp/>}/>
          <Route path="/ForgotPassword" element = {<ForgotPassword/>}/>
          <Route path="/ResetPassword/:token" element = {<ResetPassword/>}/>
         
          <Route path="/Cart" element={<Cart/>}/>

        
        </Routes>
      
      </Router>
      </ShopcontextProvider>
    </div>
   
  )
}

export default App
