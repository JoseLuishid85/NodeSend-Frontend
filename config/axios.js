import axios from "axios";

const backendURL = process.env.backendURL;

const clienteAxios = axios.create({
    baseURL: backendURL
})

export default clienteAxios;