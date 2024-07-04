import { configureStore } from '@reduxjs/toolkit'
import RegisterReduser from '../slice/register'
<<<<<<< HEAD
import sidebarReduser from '../slice/sidebar'

export const store = configureStore({
    reducer: {
        register: RegisterReduser,
        sidebarReduser

=======


export const store = configureStore({
    reducer: {
        register: RegisterReduser
>>>>>>> 8c6a15fb91b24e2bbb3a12d19f05dae130261b47
    },
    devTools: process.env.NODE_ENV !== 'production'
})