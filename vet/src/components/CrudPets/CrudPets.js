import React, { Component } from 'react';
import axios from 'axios';
import './CrudPets.css';
import Main from '../template/Main';
import UserService from "../../services/UserService";

const title = "Cadastro de Animais";

const urlAPI = "http://localhost:5144/api/Pets";
const initialState = {
    pets: { id: 0, nome: '', animal: '', situacao: '', codSala: '', idDono: '' },
    lista: [],
    mens: []
}

const user = JSON.parse(localStorage.getItem("user"));

export default class CrudPets extends Component {

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

    limpar() {
        this.setState({ pets: initialState.pets });
    }

    salvar() {
        const pets = this.state.pets;
        const metodo = pets.id ? "put" : "post"
        const url = pets.id ? `${urlAPI}/${pets.id}` : urlAPI
        axios[metodo](url, pets, { headers: { Authorization: 'Bearer ' + user.token } })
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ pets: initialState.pets, lista })
            })

    }

    getListaAtualizada(pet, add = true) {
        const lista = this.state.lista.filter(a => a.id !== pet.id)
        if (add) lista.unshift(pet)
        return lista
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const pets = { ...this.state.pets };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        pets[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ pets });
    }

    carregar(pets) {
        this.setState({ pets })
    }

    remover(pets) {
        const url = urlAPI + "/" + pets.id;
        if (window.confirm("Confirma remoção do animal: " + pets.nome)) {
            console.log("entrou no confirm");
            axios["delete"](url, pets)
                .then(resp => {
                    const lista = this.getListaAtualizada(pets, false);
                    console.log(this.lista)
                    this.setState({ pets: initialState.pets, lista })
                })
        }
    }

    

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    placeholder="Nome do bicho"
                    className="form-input"
                    name="nome"

                    value={this.state.pets.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                {/*</div><br />*/}
                <label>Animal: </label>
                <select
                    name="animal"
                    onChange={(e) => {
                        this.atualizaCampo(e);
                    }}
                >
                    <option value="">Selecione o animal desejado: </option>''
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>

                </select>
                <label>Animal: </label>
                <select
                    name="situacao"
                    onChange={(e) => {
                        this.atualizaCampo(e);
                    }}
                >
                    <option value="">Selecione a situação do animal:</option>
                    <option value="Grave">Muito Grave</option>
                    <option value="Médio">Grave</option>
                    <option value="Médio">Médio</option>
                    <option value="Médio">Boa</option>
                    <option value="Médio">Muito Boa</option>

                </select>
                <label> Sala: </label>
                <input
                    type="text"
                    id="codSala"
                    placeholder="Código da sala"
                    className="form-input"
                    name="codSala"
                    value={this.state.pets.codSala}
                    onChange={(e) => this.atualizaCampo(e)}
                />
                <label> Id Dono: </label>
                <input
                    type="text"
                    id="idDono"
                    placeholder="Id do dono"
                    className="form-input"
                    name="idDono"
                    value={this.state.pets.idDono}
                    onChange={(e) => this.atualizaCampo(e)}
                />


                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
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
                                        <button onClick={() => this.carregar(pets)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(pets)} >
                                            Remove
                                        </button>
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
            <Main title={title}>

                {(this.mens) ?

                    "Erro" + this.mens :
                    <>
                        {this.renderForm()}
                        {this.renderTable()}
                    </>
                }

            </Main>
        );
    }

    render() {
        return (
            <Main title={title}>
                {
                    (this.state.mens != null) ? 'Problema com conexão ou autorização (contactar administrador).' :
                        <>
                            {this.renderForm()}
                            {this.renderTable()}
                        </>
                }

            </Main>
        )
    }

}