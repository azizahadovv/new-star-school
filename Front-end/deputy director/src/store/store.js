import { configureStore } from '@reduxjs/toolkit'
import RegisterReduser from '../slice/register'
import sidebarReduser from '../slice/sidebar'
import addclass from '../slice/class'
export const store = configureStore({
    reducer: {
        register: RegisterReduser,
        sidebarReduser,
        addclass
    },
    devTools:process.env.NODE_ENV !== 'production',
})