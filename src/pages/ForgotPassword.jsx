import React from 'react'
import { useForm } from "react-hook-form"
import '../pages/LoginSignUp/Login.css'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom'
import login from '../assets/login.jpg';
const ForgotPassword = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
  
  
      email: yup.string().email().required("Email is required"),
    
  
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
      await delay(1) // simulating network delay
      let r = await fetch("http://localhost:8080/api/ForgotPassword", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(data)
      })
      .then(response =>{
        if(response.status===200){
         
          alert("Check Your Email to Reset your Password")
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
                <div className='text'>Forgot Password</div>
                <div className='line'></div>
              </div>
              <div className='inputs'>
  
                <br />
                <div className='input'>
                 
                  <input placeholder='&nbsp;&nbsp;Enter Your Email' {...register("email", { required: { value: true, message: "This field is required" } })} />
                  {errors.email && <div className='red'>{errors.email.message}</div>}</div>
                <br />
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
  
export default ForgotPassword
