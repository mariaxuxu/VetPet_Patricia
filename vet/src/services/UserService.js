import axios from "axios";
const API_URL = "http://localhost:5144/api/";
// visualizar: veterinario e o dono 
// Cadastro Petsa: role veterinario
// Carômetro: veterinario e dono
// login todos
// visualiza vet\; tofdos

const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "veterinarios");
};

const getVeterinarioBoard = async () => {
    return await axios.get(API_URL + "pets", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};

const getDonoBoard = async () => {
    return await axios.get(API_URL + "cadastro", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};
const UserService = {
    getPublicContent,
    getVeterinarioBoard,
    getDonoBoard
};


export default UserService;