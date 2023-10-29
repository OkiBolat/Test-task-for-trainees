import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "./slices/board.slice"

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
})
