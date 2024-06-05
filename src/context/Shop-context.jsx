import React,{createContext,useState} from 'react';
import {PRODUCTS} from "../products"
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
                let iteminfo = PRODUCTS.find((product) => product.id === Number(item));
                totalamount += cartItems[item] * iteminfo.price;
            }
        }
        return totalamount
    }
    
    const addToCart = (itemId)  =>{
        setcartItems((prev)=>({...prev,[itemId]: prev[itemId] + 1}))

    }
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
