import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    activeModal: false
}

export const AddClass = createSlice({
    name: "AddClass",
    initialState,
    reducers: {
        showModal: (state) => {
            state.visible = !state.visible
        },
        showActiveModal: (state) => {
            state.activeModal = !state.activeModal
        }

    }
})

export const { showModal, showActiveModal } = AddClass.actions

export default AddClass.reducer