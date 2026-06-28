import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   students: [],
}
export  const getStudent=createSlice({
    name: "getStudent",
    initialState,
    reducers: {
        setStudent: (state, action) => {
            state.students = action.payload
        },
        deleteStudent: (state, action) => {
            // state.students = state.students.filter((student) => student.id!== action.payload)
        },
        addStudent: (state, action) => {
            // state.students.push(action.payload)
        },
        editStudent: (state, action) => {
            // state.students = state.students.map((student) =>
            //     student.id === action.payload.id? action.payload : student
            // )
        }
    }
})