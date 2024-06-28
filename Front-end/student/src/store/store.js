import { configureStore } from '@reduxjs/toolkit'
import RegisterReduser from '../slice/register'


export const store = configureStore({
    reducer: {
        register: RegisterReduser
    },
    devTools: process.env.NODE_ENV !== 'production'
})