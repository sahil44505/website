import React from 'react'
import { useForm } from "react-hook-form"
import './Login.css'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom'
import login from '../../assets/login.jpg';
import email_icon from "../../assets/email.png"
import password_icon from "../../assets/password.png"
import { Link } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  

  const schema = yup.object().shape({


    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(20).required(),

  })
  const {
    register,
    handleSubmit,
    setError,
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
    
    try {
      let response = await fetch("http://localhost:8080/api/Login", {
          method: "POST",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      let res = await response.json();

      console.log(res.token);  // Log the token
      localStorage.setItem('token', res.token);  // Store the token
      localStorage.setItem('userId', res.userId);

      navigate("/");
      
      alert("you are Logged in");
  } catch (error) {
      console.log(error);
  }

  e.target.reset();
}

  return (
    <>


      <div className='Big-container'>
        <div className="container">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
              <div className='text'>Login</div>
              <div className='line'></div>
            </div>
            <div className='inputs'>

              <br />
              <div className='input'>
                <img src={email_icon} alt="" />
                <input placeholder='email' {...register("email", { required: { value: true, message: "This field is required" } })} />
                {errors.email && <div className='red'>{errors.email.message}</div>}</div>
              <br />
              <div className='input'>
                <img src={password_icon} alt="" />

                <input placeholder='password'  {...register("password", { minLength: { value: 7, message: "Min length of password is 7" }, })} type="password" />
                {errors.password && <div className='red'>{errors.password.message}</div>}</div>
              <br />
            </div>
            <Link className="para2"to="/ForgotPassword" >Forgot Password?</Link>
            <div className="header">
              <input disabled={isSubmitting} className={isSubmitting ? "gray" : "submit-input"} type="submit" value="Submit" /></div>
            <p className="para">Don't have an account?<Link to="/SignUp">Login</Link></p>

            {errors.myform && <div className='red'>{errors.myform.message}</div>}
            {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
          </form>
        </div>
        <div className="image">
          <img src={login} alt="Want to Login?" />
        </div>
      </div>
    </>
  )
}

export default Login