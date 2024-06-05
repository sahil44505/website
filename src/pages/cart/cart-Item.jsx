import React,{useContext} from 'react'
import { ShopContext } from '../../context/Shop-context';

const CartItem = (props) => {
    const{cartItems,addToCart,removeFromCart,updateCart} = useContext(ShopContext);
    const { id, productName, price, productImage } = props.data;
  return (
    <div className='cartItem'>
        <img src={productImage}/>
        <div className='description'>
            <p>
                <b>{productName}</b>
            </p>
            <p>Rs.{price}</p>
            <div className='countHandler'>
                <button onClick={()=>removeFromCart(id)}> - </button>
                <input value={cartItems[id]} onChange={(e)=>updateCart(Number(e.target.value),id)}/>
                <button onClick={()=>addToCart(id)}> + </button>
            </div>

        </div>
      
    </div>
  )
}

export default CartItem
