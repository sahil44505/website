import React from 'react'
import {PRODUCTS} from "../../products"
import {Product} from "./Product"
import "./Shop.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Shop = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      alert("You need to Login first")
      navigate('/Login')
    }
  },[])

  return (
    <div className="shop">
      <div className="shopTitle">
        Products
      </div>
      <div className="products">
        {PRODUCTS.map((product) => (
          <Product  data={product} />
        ))}
        </div>
      
    </div>
  )
}

export default Shop
