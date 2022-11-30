import './Logo.css';
import React from 'react';
import logo from '../../assets/images/VetPet4.png';


export default function Logo(props) {
    return (
        <aside className="logo">
            <a href="/" className="logo">
                <img src={logo} width="100" alt="Logo" />
            </a>
        </aside>
    )
}