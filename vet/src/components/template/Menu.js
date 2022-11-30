import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <nav className='menu'>

            <Link to="/veterinarios">
                Veterinários
            </Link>
            <Link to="/pets">
                Listagem
            </Link>
            <Link to="/cadastro">
                Cadastrar
            </Link>
            <Link to="/carometro">
                Procurar
            </Link>

            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}

        </nav>
    )
}