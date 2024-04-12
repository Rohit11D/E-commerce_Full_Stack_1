import React from "react";
import { useState } from "react";
import "./CSS/LoginSignup.css";
const LoginSignup = () =>{
    const [state,setState] = useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:""
    });
    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const login = async ()=>{
        //  console.log("login xe",formData);
         let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
                 },
                 body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data);
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }
    const signup = async ()=>{
        // console.log("signup xe",formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
                 },
                 body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data);
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }
    return (
       < div className="ls-back">
        <div className="login_signup">
 <h2>{state}</h2>
 <div className="credentials">
  {state==="Sign Up"?<input name="username"value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}
  <input  name="email"value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
  <input  name="password"value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />

 </div>
 <div>
    <button onClick={()=>{state==="Login"?login():signup()}} className="continue-btn">Continue</button>
 </div>

 {state==="Sign Up"?<div className="login">
 <p>Already have an account ?</p>
 <span onClick={()=>{setState("Login")}} >Login here</span>
 </div>:<div className="login">
 <p>Create an account ?</p>
 <span onClick={()=>{setState("Sign Up")}}>Sign Up</span>
 </div>}
 
 

 <div className="checkboxTerms">
 <input type="checkbox" name="" id="" />
 <p>By continuing, i agree to the terms of use & privacy policy.</p>
 </div>
        </div>
        </div>
    )
}

export default LoginSignup;