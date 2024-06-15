import React,{useContext} from 'react'
import {PRODUCTS} from "../../products"
import {ShopContext} from "../../context/Shop-context"
import CartItem from './cart-Item'
import "./cart.css"
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const navigate = useNavigate();
  const {cartItems,getTotalAmount} = useContext(ShopContext);
  const total = getTotalAmount();
  const isLoggedIn = localStorage.getItem('token');
  return (
    <div className='cart'>
      <div>
        <h1> Your cart Items</h1>
      </div>
      <div className='cartItems'>
        
        {PRODUCTS.map((product)=>{
          
          if(cartItems[product._id] !== 0){
            
            if (!isLoggedIn){
              
               return <p>Your cart is empty</p>
              
            }
            else{
               return <CartItem data={product} />
              
          }
            
            
          }
        })}

      </div>
      <div className='checkout'>
      {isLoggedIn && <p> SubTotal :  Rs.{total}</p>}
        <button onClick={()=>navigate("/")}>Continue Shopping</button>
        <button>CheckOut</button>
      </div>
        
    </div>
  )
}

export default Cart
