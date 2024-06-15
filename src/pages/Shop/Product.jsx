import React,{ useContext } from 'react'
import {ShopContext} from "../../context/Shop-context"


export const Product = (props) => {
  const { _id, productName, price, productImage } = props.data;
  const {addToCart,cartItems} = useContext(ShopContext);
  let cartItemsamount = cartItems[_id]
 
  return (
    <div className='product'>
      <img src={productImage} />

      <div className='description'>
        <p>
          <b>{productName}</b>
        </p>
        <p>{price}.Rs</p>
      </div>
      <button className="addToCartBttn" onClick={()=> addToCart(_id)}>Add to Cart{cartItemsamount > 0 && <>({cartItemsamount})</>} </button>
      


    </div>
  )


}


