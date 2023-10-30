import { createSlice } from "@reduxjs/toolkit"
import { initialData } from "../../App"

const data =
  localStorage.getItem("appData") !== null
    ? JSON.parse(localStorage.getItem("appData"))
    : initialData

const initialState = {
  ...data,
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.columns[action.payload[0]].taskIds.push(action.payload[1].id)
      state.tasks[action.payload[1].id] = { ...action.payload[1] }
      localStorage.setItem("appData", JSON.stringify(state))
    },
    removeTask: (state, action) => {
      state.columns[action.payload[0]].taskIds = state.columns[
        action.payload[0]
      ].taskIds.filter((taskId) => taskId !== action.payload[1].id)

      delete state.tasks[action.payload[1].id]
      localStorage.setItem("appData", JSON.stringify(state))
    },
    changeTask: (state, action) => {
      console.log(action)
    },

    changeColumns: (state, action) => {
      state.columns = {
        ...state.columns,
        ...action.payload,
      }
      localStorage.setItem("appData", JSON.stringify(state))
    },
  },
})

export const { addTask, removeTask, changeColumns } = boardSlice.actions
export default boardSlice.reducer
