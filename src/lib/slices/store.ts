import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './lib/slices/dataSlice'
import editingReducer from './lib/slices/editingSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    editing: editingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch