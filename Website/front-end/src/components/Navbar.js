import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from './GemblouxLogo.png'

function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const ClickHome = (event) => {
        console.log(window.location.pathname)
        if ('/box-search' === window.location.pathname || '/' === window.location.pathname) {
            // Empêchez le comportement par défaut du lien
            event.preventDefault();
            closeMobileMenu();
            // Rechargez la page
            window.location.reload();
        }
    }

    const Logout = () => props.Logout();

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    }

    useEffect(() => {showButton();}, []);

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={ClickHome}>
                    <img className='logo-nav' src={logo}/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/box-search' className='nav-links' onClick={ClickHome}>
                            Boxes
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/individual-search' className='nav-links' onClick={closeMobileMenu}>
                            Individuals
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/add-data' className='nav-links' onClick={closeMobileMenu}>
                            Add Data
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    {props.isAdmin() &&
                            <li>
                                <Link to='/admin-pannel' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    ADMIN
                                </Link>
                            </li>
                    }
                    {props.isAuthenticated() ?
                        (
                            <>
                            <li>
                                <Link to='/usersettings' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='nav-links-mobile' onClick={Logout}>
                                    SignOut
                                </Link>
                            </li>
                            </>
                        ) : (
                            <li>
                                <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    SignIn
                                </Link>
                            </li>
                        )
                    }
                </ul>
                {props.isAdmin() && button && 
                        <Link to='/admin-pannel'>
                            <button className={`btn btn--outline btn--medium btn-nav`} onClick={closeMobileMenu}>
                                ADMIN
                            </button>
                        </Link>
                }
                {props.isAuthenticated() ?
                    (
                    <>
                        {button 
                        && 
                        <Link to='/usersettings'>
                            <button className={`btn btn--outline btn--medium btn-nav`} onClick={closeMobileMenu}>
                                Settings
                            </button>
                        </Link>
                        }
                        {button 
                        && 
                        <Link to='/'>
                            <button className={`btn btn--outline btn--medium btn-nav`} onClick={Logout}>
                                SignOut
                            </button>
                        </Link>
                        }
                    </>
                    ) : (
                    <>
                        {button 
                        && 
                        <Link to='/sign-in'>
                            <button className={`btn btn--outline btn--medium`} onClick={closeMobileMenu}>
                                SignIn
                            </button>
                        </Link>
                    }
                    </>
                    )
                }
            </div>
        </nav>
        </>
    );
}

export default Navbar;