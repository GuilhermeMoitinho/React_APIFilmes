/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import './NavBar.css'


 const NavBar = () => {
    const [search, setsearch] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!search) return

        navigate(`/search?q=${search}`)
        setsearch("")
    }

    return (
        <nav id="navbar">
        <h2>
            <Link to='/'><BiCameraMovie/> MoviesLib</Link>
        </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Busque um filme' className="text" onChange={(e) => setsearch(e.target.value)} 
                value={search}/>
                <button type='submit'>
                    <BiSearchAlt2/>
                </button>
            </form>
    </nav>
    )
}

export default NavBar