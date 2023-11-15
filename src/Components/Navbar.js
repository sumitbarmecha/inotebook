import React from 'react';
import logo from './bootstrap-logo.svg';
import './Navbar.css';
import {Link ,useLocation} from "react-router-dom";
const Navbar = () => {
    let location = useLocation();

    
    return <div className='d-flex justify-content-center  my-2 fixed-top'>
        <nav className="  rounded-pill navbar  navbar-expand-lg navbar-light bg ">
            <div className="container-fluid">
                <Link className="navbar-brand p-0 mx-2" to="/">
                    <img src={logo} alt="" width="30" height="24" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link  m-0 py-0 text-white ${location.pathname==="/"? "activate":""} `} to="/"> home</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className={`nav-link m-0 py-0 text-white ${location.pathname==="/about"? "activate":""}`} to="/about"> about</Link>
                        </li>
                        
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link  m-0 py-0 text-white ${location.pathname==="/login"? "activate":""} `} to="/login"> Login</Link>
                        </li>
                     
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>;

}

export default Navbar;
