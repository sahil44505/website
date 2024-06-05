import user_icon from "../../assets/person.png"
import email_icon from "../../assets/email.png"
import password_icon from "../../assets/password.png"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form" 
import './Login.css'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup" 
import { Link } from 'react-router-dom'

import signup from '../../assets/signup.jpg';


 
  

const SignUp = ()=> { 
  const navigate = useNavigate();
  const schema = yup.object().shape({

    Name: yup.string().required("Your Name is Required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(20).required(),

  })
  const {
    register,
    handleSubmit,
       
    formState: { errors, isSubmitting },
  } = useForm( {resolver: yupResolver(schema)});

  const delay = (d)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
 

  const onSubmit = async(data,e) => {
    await delay(1) 
    let r =  await fetch("http://localhost:8080/api/SignUp", {
      method: "POST",  
      credentials: "include",
    headers: {
      "Content-Type": "application/json", 
    }, body: JSON.stringify(data)
  }).then(response =>{
    if(response.status===200){
    
      navigate("/Login");
      alert("you are Registered");
     

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
       <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className='header'>
          <div className='text'>SignUp</div>
          <div className='line'></div>
          </div>
          <div className='inputs'>
          <div className='input'>
          <img src={user_icon} alt="" />
          <input placeholder='Name' {...register("Name", { required: {value: true, message: "This field is required"}, minLength: {value: 3, message: "Min length is 3"}, maxLength: {value: 8, message: "Max length is 8"} })} type="text"   />
          {errors.Name && <div className='red'>{errors.Name.message}</div>}</div>
          <br />
          <div className='input'>
          <img src={email_icon} alt="" />
          <input placeholder='email' {...register("email", { required: {value: true, message: "This field is required"} })}    />
          {errors.email && <div className='red'>{errors.email.message}</div>}</div>
          <br />
          <div className='input'>
          <img src={password_icon} alt="" />

          <input placeholder='password'  {...register("password", {minLength: {value: 7, message: "Min length of password is 7"},})} type="password"/>
          {errors.password && <div className='red'>{errors.password.message}</div>}</div>
          <br />
          </div>
          <div className="header">
          <input disabled={isSubmitting} className= {isSubmitting ? "gray":"submit-input" } type="submit" value="Submit" /></div>
          <p className="para">Already have a account?<Link to="/Login">Login</Link></p>
          
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
        </form>
       </div>
       <div className="image">
         <img src={signup} alt="Want to SignUp?" />
         </div>
       </div>
    </>
  )
}

export default SignUp