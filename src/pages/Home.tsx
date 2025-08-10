import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../store'
import { deleteItem } from '../lib/slices/dataSlice'
import { startEditing } from '../lib/slices/editingSlice'

export default function Home() {
  const items = useSelector((state: RootState) => state.data.items)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Home</h1>
        <Link
          to="/about"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Create New
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items yet. Click Create New to add.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white border shadow-sm rounded-lg p-4 flex items-start justify-between"
            >
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    dispatch(startEditing(item))
                    navigate('/about')
                  }}
                  className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(deleteItem(item.id))}
                  className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}