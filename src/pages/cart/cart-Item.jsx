import React,{useContext} from 'react'
import { ShopContext } from '../../context/Shop-context';

const CartItem = (props) => {
    const{cartItems,addToCart,removeFromCart,updateCart} = useContext(ShopContext);
    const { _id, productName, price, productImage } = props.data;
  return (
    <div className='cartItem'>
        <img src={productImage}/>
        <div className='description'>
            <p>
                <b>{productName}</b>
            </p>
            <p>Rs.{price}</p>
            <div className='countHandler'>
                <button onClick={()=>removeFromCart(_id)}> - </button>
                <input value={cartItems[_id]} onChange={(e)=>updateCart(Number(e.target.value),_id)}/>
                <button onClick={()=>addToCart(_id)}> + </button>
            </div>

        </div>
      
    </div>
  )
}

export default CartItem
