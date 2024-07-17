import { configureStore } from '@reduxjs/toolkit'
import RegisterReduser from '../slice/register'
import sidebarReduser from '../slice/sidebar'
import addclass from '../slice/addclass'
export const store = configureStore({
    reducer: {
        register: RegisterReduser,
        sidebarReduser,
        addclass

    }
})