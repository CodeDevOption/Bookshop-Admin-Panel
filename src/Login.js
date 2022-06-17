import React from 'react'
import { useState } from 'react';
import './Login.css';
import { useStateValue } from './StateProvider';
function Login() {
    const[state,dispatch] = useStateValue();
    const [username,setusername] = useState('');
    const [password,setPassword] = useState('');
    // SignIn User
    const SignIN = ()=>{
      if(username.toLocaleLowerCase().trim() === "storyflix.test@gmail.com" && password.toLocaleLowerCase().trim() === "admin@12345"){
        dispatch({
          type:"user",                                        
          user:true,
        })
      }else{
        alert("Email or Password Invalid");
      }
    }
  return (
    
    <div className='login'>
        <div className="login__container">
            <h1>Login</h1>
            <input  placeholder='Email' onChange={(e)=>setusername(e.target.value)} type="text" />
            <input  type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} name="" id="" />
            <button onClick={SignIN}>Login</button>
        </div>
        
    </div>
  )
}

export default Login