import React from "react";

const Home = () => {
  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <h1>Welcome to Expense Tracker!!!</h1>
      <button><span>Your Profile is Incomplete.</span><span style={{color:'blue',cursor:'pointer'}}>Complete Now</span></button>
      <div>
        <h1>Contact Details</h1>
        <button>Cancel</button>
       <div>
        <p>Full Name: </p>
        <input/>
        <p>Profile Photo URL: </p>
        <input/>
       </div>
      </div>
    </div>
  );
};

export default Home;
