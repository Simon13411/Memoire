
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    }
    else {
      setButton(true);
    }
  }

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Collection-Gembloux
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/box-search' className='nav-links' onClick={closeMobileMenu}>
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
            <li>
              <Link to='/admin-pannel' className='nav-links-mobile' onClick={closeMobileMenu}>
                Admin
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>ADMIN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;