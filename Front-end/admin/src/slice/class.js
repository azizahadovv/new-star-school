import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: null,
  activeModal: false,
  class: [],
  isLoader: false,
  error: null,
  classesData:{},
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
    postClass:(state,actions) => {
      state.classesData=actions.payload
    }
  },
});

export const { showModal, showActiveModal,setClasses,postClass } = AddClass.actions;

export default AddClass.reducer;
