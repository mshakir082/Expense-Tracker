import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Signup.module.css'
export default function Form() {

// States for registration
const emailRef = useRef();
const passwordRef = useRef();
const confirmPassRef = useRef();

const [isLoading,setLoding]=useState(true);
const [loginToken,setLoginToken]=useState(true);
const [isLogin, setIsLogin] = useState(true);

const navigate = useNavigate();
// Handling the form submission
const handleSubmit = (e) => {
e.preventDefault();

let emailInput=emailRef.current.value;
let passwordInput=passwordRef.current.value;
let confirmPassInput=confirmPassRef.current.value;

if(passwordInput==confirmPassInput){
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHAQzIrJzoMAPL40v-7rbjIoK7Je0Z5Po',{
        method:'POST',
        body:JSON.stringify({
            email:emailInput,
            password:passwordInput,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        setLoding(false)
        if(res.ok){
            return res.json();
        }else{
            return res.json().then(data=>{
                let errorMessage = 'Authentication faild';
                if(data && data.error && data.error.message){
                    errorMessage=data.error.message;
                }
                throw new Error(errorMessage);
            })
        }
    })
    .then(data=>{
        setLoginToken(data.idToken);
        navigate('/');
        console.log(data)
    })
    .catch(err=>{
        alert(err.message)
    })
    
}else{
    alert('Confirm password not match')
}

};


return (
<section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handelSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={inputEmail} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={inputPassword} required />
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
         {isLoading && <p>...Loading</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
);
}