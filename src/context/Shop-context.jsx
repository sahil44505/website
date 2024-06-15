import React,{createContext,useState} from 'react';
import {PRODUCTS} from "../products"
import { useEffect } from 'react';
import axios from 'axios';

import mongoose from 'mongoose';
export const ShopContext = createContext(null);

//Function for getting default values of items which is initially zero



const getDefaultCart =  () =>{
   
    let cart= {}
    
    for(let i=1; i < PRODUCTS.length+1;i++){
        cart[i]=0;

    }
    return cart;
}
const ShopcontextProvider = (props) => {

    const[cartItems,setcartItems]=useState( getDefaultCart());
    const getTotalAmount = () =>{
        let totalamount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0 ){
                let iteminfo = PRODUCTS.find((product) => product._id === Number(item));
                totalamount += cartItems[item] * iteminfo.price;
            }
        }
        return totalamount
    }
    useEffect(() =>{
        localStorage.setItem("Cart",JSON.stringify(cartItems))

    },[cartItems])
    const addToCart = (itemId) => {
        

        const _itemId = itemId
        const userId = localStorage.getItem('userId');
        console.log ({ _itemId , userId});
        const isValidObjectId = (_itemId) => /^[0-9a-fA-F]{24}$/.test(_itemId);
        const itemIdObject = new mongoose.Types.ObjectId(_itemId);

        if (!isValidObjectId(itemIdObject)) {
            console.error('Invalid item ID format');
            return;
         }
        const _data =  {_itemId , userId}
        axios.post(`http://localhost:8080/api/add-to-cart`,_data)
        .then(res => {
            console.log(res.data)
            
        })
        .catch(err =>{
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', err.response.data);
                console.error('Error response status:', err.response.status);
                console.error('Error response headers:', err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Error request:', err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
            }
            console.error('Error config:', err.config);
        });
        


       
    };
    // const addToCart = (itemId)  =>{
        
    //     setcartItems((prev)=>({...prev,[itemId]: prev[itemId] + 1}))

    // }
    const removeFromCart = (itemId)  =>{
        setcartItems((prev)=>({...prev,[itemId]: prev[itemId] - 1}))

    }
    const updateCart = (newItem,itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]: newItem}))
    }
    
    //provide every state or value to context provider in an object type
    const contextValue ={
        cartItems,
        addToCart,
        removeFromCart,
        updateCart,
        getTotalAmount}
  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopcontextProvider;
