import React from 'react'
import { BsFillHouseFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function BackButton() {
    
return (
    <Link to="/meals" className="home btn-copy-favorite">
        <BsFillHouseFill />
    </Link>
)
}
