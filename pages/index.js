//import { Inter } from 'next/font/google'
//const inter = Inter({ subsets: ['latin'] })
import React, { useContext, useEffect } from "react"; { }
import Layout from "@/components/Layout";
import authContext from "@/context/auth/authContext";
import appContext from "@/context/app/appContext";
import Link from "next/link";
import Dropzone from "@/components/Dropzone";
import Alerta from "@/components/Alerta";


export default function Home() {

    //extraer el usuario autentiado del storage
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;

    //extraer el mesaje de error de archivos
    const AppContext = useContext(appContext);
    const { mensaje_archivo, url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            usuarioAutenticado();
        }
        
    }, [])

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-2/3 mx-auto mb-32">

                {url ? (
                    <>
                    
                    <p className="text-center text-2xl ">
                        <span className="font-bold text-red-700 text-3xl">Tu URL es:</span> { `http://localhost:3000/enlaces/${url}` }
                    </p>
                    <button
                        type='button'
                        className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10'
                        onClick={() => navigator.clipboard.writeText(`http://localhost:3000/enlaces/${url}`)}
                    >Copiar Enlace</button>
                </>
                ) : (
                    <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                        {mensaje_archivo && <Alerta />}

                        <Dropzone />
                        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivo de forma sencilla y privada</h2>
                            <p className="text-lg leading-loose">
                                <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo y un archivo que se eliminado después de ser descargado.
                                Así que puedes mantener lo que comprartes en privado y asegurarte de que tus cosas no permanezcan en linea para siempre
                            </p>
                            <hr />
                            <Link href="/crearcuenta" className="text-red-500 font-bold text-lg hover:text-red-700">
                                Crear una cuenta para mayores beneficios
                            </Link>
                        </div>
                    </div>
                )}


            </div>
        </Layout >
    )
}
