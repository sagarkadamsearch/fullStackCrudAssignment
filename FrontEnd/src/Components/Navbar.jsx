
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div style={{display:'flex',gap:"10px",textAlign:"center"}}>
            <Link to="/">Home</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Posts">Posts</Link>
        </div>
    );
};

export default Navbar;