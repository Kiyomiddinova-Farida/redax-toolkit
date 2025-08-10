import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../store'
import { addItem, updateItem } from '../lib/slices/dataSlice'
import { clearEditing } from '../lib/slices/editingSlice'

export default function About() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const editingItem = useSelector((s: RootState) => s.editing.editingItem)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title)
      setDescription(editingItem.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingItem])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (title.trim().length === 0) return

    if (editingItem) {
      dispatch(
        updateItem({ id: editingItem.id, title: title.trim(), description: description.trim() })
      )
      dispatch(clearEditing())
    } else {
      dispatch(addItem({ title: title.trim(), description: description.trim() }))
    }

    navigate('/')
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">{editingItem ? 'Update Item' : 'Create Item'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-lg shadow-sm p-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {editingItem ? 'Save Changes' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(clearEditing())
              navigate('/')
            }}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}