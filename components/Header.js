import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import authContext from '@/context/auth/authContext'
import appContext from '@/context/app/appContext'
import { useRouter } from 'next/router'

const Header = () => {

  //routing 
  const router = useRouter();

  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  useEffect(() => {
    usuarioAutenticado
  }, [])

  const redireccionar = () =>{
    router.push('/');

    limpiarState()
  }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>

        <img onClick={()=> redireccionar()} src='/logo.svg' className='w-64 mb-8 md:mb-0 cursor-pointer' />

      <div>
        {
          usuario ? (
            <div className='flex items-center'>
              <p className='mr-2'>Hola: {usuario.nombre}</p>
              <button
                  type='button'
                  className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                  onClick={() => cerrarSesion() }
              >Cerrar Sesión
              </button>
            </div>

          ) : (
            <>
              <Link href="/login" className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2' >Iniciar Sesión</Link>
              <Link href="/crearcuenta" className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase' >Crear Cuenta</Link>
            </>
          )
        }

      </div>
    </header>
  )
}

export default Header