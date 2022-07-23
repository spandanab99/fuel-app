import React from 'react'
import "../App.css";

export default function Navbar() {

    function handleLogout () {
      localStorage.removeItem('x-token')
      window.location.href = '/login'
    }
    return (
        <header className='navbar'>
        <div className='navbar__title navbar__item'><a href="/home">Fuel App</a></div>
        <div className='navbar__item'><a href="/quote">Get Quote</a></div>
        <div className='navbar__item'><a href="/history">Quote History</a></div>
        <div className='navbar__item'><a href="/profile">Profile</a></div>
        {localStorage.getItem('x-token') ? (
          <div className='navbar__item'>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        ) : null}
      </header>
    )
}