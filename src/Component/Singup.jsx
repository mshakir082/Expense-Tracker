import { useRef } from 'react';
import { useState } from 'react';
export default function Form() {

// States for registration
const emailRef = useRef();
const passwordRef = useRef();
const confirmPassRef = useRef();




// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);



// Handling the form submission
const handleSubmit = (e) => {
e.preventDefault();
let obj={
    
};

};


return (
<div className="form">
<div>
<h1>SignUp</h1>
</div>

{/* Calling to the methods */}
<div className="messages">

</div>

<form>
{/* Labels and inputs for form data */}
<label className="label">Email</label>
<input className="input"
 type="email" placeholder='Email' ref={emailRef} required/>

<label className="label">Password</label>
<input  className="input"
 type="password" placeholder='Password' ref={passwordRef} required/>

<label className="label">Confirm Password</label>
<input  className="input"
 type="password" placeholder='Confirm Password' ref={confirmPassRef} required/>

<button onClick={handleSubmit} className="btn" type="Sign Up">
Submit
</button>
</form>
</div>
);
}