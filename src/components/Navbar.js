import React from 'react'
import { Link } from 'react-router-dom'

import "../App.css";

export default function Navbar() {
    return (
        <header className='navbar'>
        <div className='navbar__title navbar__item'><a href="/home">Fuel App</a></div>
        <div className='navbar__item'><a href="/quote">Get Quote</a></div>
        <div className='navbar__item'><a href="/history">Quote History</a></div>
        <div className='navbar__item'><a href="/profile">Profile</a></div>
      </header>
    )
}