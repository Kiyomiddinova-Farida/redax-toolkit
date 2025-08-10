import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from './dataSlice'

interface EditingState {
  editingItem: Item | null
}

const initialState: EditingState = {
  editingItem: null,
}

const editingSlice = createSlice({
  name: 'editing',
  initialState,
  reducers: {
    startEditing: (state, action: PayloadAction<Item>) => {
      state.editingItem = action.payload
    },
    clearEditing: (state) => {
      state.editingItem = null
    },
  },
})

export const { startEditing, clearEditing } = editingSlice.actions
export default editingSlice.reducer