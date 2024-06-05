import React from 'react'
import { useForm } from "react-hook-form"
import '../pages/LoginSignUp/Login.css'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate , useParams } from 'react-router-dom'
import login from '../assets/login.jpg';
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
const ResetPassword = () => {
    const navigate = useNavigate();
    // const {token} = useParams();
    const { token } = useParams();
    console.log("Token:", token); 

    const schema = yup.object().shape({
  
  
      password: yup.string().min(4).max(20).required()
    
  
    })
    const {
      register,
      handleSubmit,
      
      formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });
  
    const delay = (d) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, d * 1000);
      })
    }
  
  
    const onSubmit = async (data, e) => {
      await delay(1) 
      let r = await fetch("http://localhost:8080/api/ResetPassword/"+token, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(data)
      })
     
      .then(response =>{
        if(response.status===200){
         
        
          navigate("/Login")
    
        }
        let res =   response.json()
        console.log(res);
      
        
      }).catch(err =>{
        console.log(err);
      })
       
        
        e.target.reset();
        
      }
  
    return (
      <>
  
  
        <div className='Big-container'>
        <div className="image">
            <img src={login} alt="Want to Login?" />
          </div>
          <div className="container">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className='header'>
                <div className='text'>Reset Password</div>
                <div className='line'></div>
              </div>
              <div className='inputs'>
  
                <br />
                
              <div className='input'>
                <img src={password_icon} alt="" />

                <input placeholder='password'  {...register("password", { minLength: { value: 7, message: "Min length of password is 7" }, })} type="password" />
                {errors.password && <div className='red'>{errors.password.message}</div>}</div>
              <br/>
                </div>
              
              <div className="header">
                <input disabled={isSubmitting} className={isSubmitting ? "gray" : "submit-input"} type="submit" value="Send" /></div>
             
  
              {errors.myform && <div className='red'>{errors.myform.message}</div>}
              {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
            </form>
          </div>
          
        </div>
      </>
    )
  }
  
export default ResetPassword
