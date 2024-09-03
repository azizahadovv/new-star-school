import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  activeModal: false,
  class: [],
  isLoader: false,
  error: false,
  classesData: {},
  numberGroup: null,
};

export const AddClass = createSlice({
  name: "AddClass",
  initialState,
  reducers: {
    showModal: (state) => {
      state.visible = !state.visible;
    },
    showActiveModal: (state) => {
      state.activeModal = !state.activeModal;
    },
    setClasses: (state, actions) => {
      state.class = actions.payload;
    },
    postClass: (state, actions) => {
      state.classesData = actions.payload;
    },
    getClassStudentsData: (state, actions) => {
      state.studentData.push(actions.payload);
      console.log(actions.payload[0]);
    },
  },
});

export const {
  showModal,
  showActiveModal,
  setClasses,
  postClass,
  getClassStudentsData,
} = AddClass.actions;

export default AddClass.reducer;
