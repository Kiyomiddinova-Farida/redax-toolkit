import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Item {
  id: string
  title: string
  description: string
}

interface DataState {
  items: Item[]
}

const initialState: DataState = {
  items: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      state.items.push({ id: nanoid(), ...action.payload })
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...action.payload }
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
})

export const { addItem, updateItem, deleteItem } = dataSlice.actions
export default dataSlice.reducer