import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    open: false,
}

export const SidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openVisible: (state) => {
            state.open = !state.open
            console.log("hello");
        },
    }
})

export const { openVisible } = SidebarSlice.actions

export default SidebarSlice.reducer