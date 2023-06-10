import React from 'react'
import {FaHome} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {

    //create array for categories
    const categories = ["Health", "Food", "Travel", "Technology"]

    //activate hook
    let navigate = useNavigate()

  return (
    <div className='header-container'>
        <FaHome className='home-icon'onClick={()=>navigate('/')}/>
        <div className="categories-container">
            {
                categories.map((item, index)=><Link to={`/category/${item}`}className='nav-link' key={index}>{item}</Link>)
            }
        </div>
        
    </div>
  )
}

export default Header