import { configureStore } from '@reduxjs/toolkit'
import RegisterReduser from '../slice/register'
import sidebarReduser from '../slice/sidebar'

export const store = configureStore({
    reducer: {
        register: RegisterReduser,
        sidebarReduser

    },
    devTools: process.env.NODE_ENV !== 'production'
})