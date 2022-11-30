import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import CrudPets from './components/CrudPets/CrudPets';
import Listagem from './components/Listagem/Listagem';
import Carometro from './components/Carometro/Carometro';
import AuthService from '../src/services/AuthService';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Veterinarios from './components/Veterinarios/Veterinarios';

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem-Vindo ao VETPET!">
                        <div>Clínica Veterinária: Consulte aqui a situação do meu PET 🦴</div>
                    </Main>
                }
            />
            {currentUser ? (
                <Route exact path='/pets'
                    element={<Listagem />}
                />
            ) : (
                <Route exact path='/pets'
                    element={
                        <Main title="Visualização de Animais">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}

            {currentUser ? (
                <Route exact path='/cadastro'
                    element={
                        <CrudPets />
                    }
                />
            ) : (
                <Route exact path='/cadastro'
                    element={
                        <Main title="Cadastro de Animais">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}

            <Route path='/carometro' element={<Carometro />} />*/
            <Route path='/veterinarios' element={<Veterinarios />} />*/

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
        </Routes>
    )
}
