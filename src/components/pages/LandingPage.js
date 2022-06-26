import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="landing text-center">
            <h1 className="main-title home-page-etitle">Estimate your Fuel expenses</h1>
            <br/><br/><br/>
            <Link to="/login">
                <button className="land-button">Login</button>
            </Link>
            <Link to="/register">
                <button className="land-button">Register</button>
            </Link>
        </div>
    )
}