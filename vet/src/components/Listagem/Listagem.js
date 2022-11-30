import React, { Component } from 'react';
import axios from 'axios';
import './Listagem.css';
import Main from '../template/Main';
import UserService from "../../services/UserService";

const title = "Listagem de Animais";

const urlAPI = "http://localhost:5144/api/Pets";
const initialState = {
    pets: { id: 0, nome: '', animal: '', situacao: '', codSala: '', idDono: '' },
    lista: [],
    mens: null
}

const user = JSON.parse(localStorage.getItem("user"));

export default class Listagem extends Component {
    state = { ...initialState }

    componentDidMount() {
        /*axios(urlAPI).then(resp => {
        //console.log(resp.data)
        this.setState({ lista_aluno: resp.data });
        })*/
        axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
            .then(resp => {
                this.setState({ lista_pets: resp.data });
            })

        UserService.getVeterinarioBoard().then(
            (response) => {
                console.log("componentDidMount getVeterinarioBoard: " + response.data)
                this.setState({ lista: response.data, mens: null })
            },

            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({ mens: _mens });
            }
        );
    }


    renderTable() {
        return (
            <div className="listagem">
                <table className="listaPets" id="tblListaPets">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloDono">Id Dono</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloAnimal">Animal</th>
                            <th className="tabTituloSituacao">Situação</th>
                            <th className="tabTituloSala">Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (pets) =>

                                <tr key={pets.id}>
                                    <td>{pets.idDono}</td>
                                    <td>{pets.nome}</td>
                                    <td>{pets.animal}</td>
                                    <td>{pets.situacao}</td>
                                    <td>{pets.codSala}</td>
                                    <td>

                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            (this.mens != null) ?
                <Main title={title}>
                    <div>Não autorizado ou Erro na conexão</div>
                </Main>

                :
                <>
                    <Main title={title}>

                        {this.renderTable()}
                    </Main>

                </>
        )
    }
}
