import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'
const NavBar = () => {
  return (
    <div>
      <div className={classes.container}>
        <Link to='/'><h1>Home</h1></Link>
        <Link to='/login'><h1>Login</h1></Link>
      </div>
    </div>
  )
}

export default NavBar
