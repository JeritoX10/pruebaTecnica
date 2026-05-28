import { useEffect, useState } from 'react'
import { validateProductForm } from './ProductForm'

export default function EditProductModal({ product, onClose, onSave, isSaving }) {
  const [form, setForm] = useState({ precio: '', stock: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setForm({
        precio: String(product.precio),
        stock: String(product.stock),
      })
      setErrors({})
    }
  }, [product])

  if (!product) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validation = validateProductForm({
      nombre: product.nombre,
      imagen: product.imagen,
      categoria: product.categoria,
      precio: form.precio,
      stock: form.stock,
    })

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    onSave({
      ...product,
      precio: Number(form.precio),
      stock: Number(form.stock),
    })
  }

  const fieldClass = (name) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
      errors[name]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
    }`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="edit-title" className="text-lg font-semibold text-slate-900">
              Editar producto
            </h2>
            <p className="mt-1 text-sm text-slate-500 line-clamp-1">{product.nombre}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-precio" className="mb-1 block text-sm font-medium text-slate-700">
              Precio (COP)
            </label>
            <input
              id="edit-precio"
              name="precio"
              type="number"
              min="0"
              value={form.precio}
              onChange={handleChange}
              className={fieldClass('precio')}
            />
            {errors.precio && (
              <p className="mt-1 text-xs text-red-600">{errors.precio}</p>
            )}
          </div>

          <div>
            <label htmlFor="edit-stock" className="mb-1 block text-sm font-medium text-slate-700">
              Stock
            </label>
            <input
              id="edit-stock"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              className={fieldClass('stock')}
            />
            {errors.stock && (
              <p className="mt-1 text-xs text-red-600">{errors.stock}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
