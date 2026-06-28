import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    token: uuidv4(),
}

// const navigate = useNavigate()

export const RegisterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        registerBtn: (state) => {
            localStorage.setItem('token', state.token);
        },
        exitSidebarBtn: (state) => {
            localStorage.removeItem('token');
        }
    },
})

// Action creators are generated for each case reducer function
export const { registerBtn, exitSidebarBtn } = RegisterSlice.actions

export default RegisterSlice.reducer