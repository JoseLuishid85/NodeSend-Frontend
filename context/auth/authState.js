import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import { 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "@/types";

import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";

const authState = ({children}) => {

    //Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    } 

    //definir el reducer
    const [ state, dispatch ] = useReducer(authReducer,initialState);

    //registrar usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data.msg);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        //Limpiar la Alerta despues de 3segundo
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        },3000)
    }

    //Autenticar Usuarios
    const iniciarSesion = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });

        } catch (error) {
            //console.log(error)
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        //Limpiar la Alerta despues de 3segundo
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        },3000)
    }

    //retorne el usuario autenticado en base al JWT
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }

            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    //Cerrar Sesion
    const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default authState;