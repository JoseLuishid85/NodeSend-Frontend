import React from 'react'
import AuthState from '@/context/auth/authState'
import AppState from '@/context/app/appState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  )
}
