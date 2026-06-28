import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active: false,
    isLoading: false,
    error: null,

}

export const AddUserSlise = createSlice({
    name: 'addUser',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        }
    }

})

export const { addUser } = AddUserSlise.actions

export default AddUserSlise.reducer