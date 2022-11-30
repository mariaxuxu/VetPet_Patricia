//import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import Main from '../template/Main';
import axios from "axios";
import './Carometro.css';
import AuthService from "../../services/AuthService";
const title = "Cadastro de Carômetro";

const urlPets = "http://localhost:5144/api/Carometro"
const images = {
    "Cachorro": [ 'cachorro2.jpg', 'cachorro3.jpg', 'cachorro4.jpg', 'cao2.jpeg', 'cao5.jpg' ],
    "Gato": ['gato1.jpg', '1.jpg']
}

const Carometro = () => {
    const [data, setData] = useState([])
    const [animaisLista, setAnimais] = useState([])
    const [petsLista, setPets] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const [mens, setMens] = useState(null)

    const getAnimalAleatorio = async (animalAtual) => {
        const animais = images[animalAtual]
        const animalAleatorio = animais[Math.floor(Math.random() * animais.length)]
        const img = await import(`../../assets/${animalAtual}/${animalAleatorio}`)
        return img.default
    }

    const dataFromAPI = async () => {
        const token = AuthService.getCurrentUser()?.token

        await axios.get(urlPets, { headers: { Authorization: 'Bearer ' + token } })
            .then(resp => {
                setData(resp.data)
                let animais = resp.data.map(anima => {
                    const animal = anima.animal
                    
                    return animal 
                })

                setAnimais([...new Set(animais)])
            })
            .catch(error => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMens(_mens)
            });
    }

    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
        }
    }, [dataAtualizada])


    const atualizaPet = async (event) => {
        const cod = event.target.value;
        const listaDePets = data.filter((pets) =>
            pets.animal == cod
        );
        for (let index = 0; index < listaDePets.length; index++) {
            listaDePets[index].img = await getAnimalAleatorio(cod)
            index++
        }
        setPets(listaDePets);
    }

    return (
        (mens != null) ?

            <Main title={title}>
                <div>Não autorizado ou Erro na conexão</div>
            </Main>
            :
            <>
                <div>
                    <select
                        name="id"
                        onChange={(e) => {
                            atualizaPet(e);
                        }}
                    >
                        <option value="">Selecione o animal</option>
                        {animaisLista.map((pet) => (
                            <option name="id" value={pet}>
                                {pet}
                            </option>
                        ))}
                    </select>
                    <div className="card-align">
                        <div className="card-def">
                            {petsLista.map((datas) => {
                                return (
                                    <div key={datas.id} className="card-sombra">
                                        <div className="image-align">
                                            <img src={datas.img} alt={datas.nome} />
                                        </div>
                                        <div className="card-geral">
                                            <span className="">{datas.nome}</span>
                                            <span className="">Situação: {datas.situacao}</span>
                                            <span className="">Id Dono: {datas.idDono}</span>
                                            <span className="">Id PET: {datas.id}</span>
                                            <span className="">Código da Sala: {datas.codSala}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Carometro