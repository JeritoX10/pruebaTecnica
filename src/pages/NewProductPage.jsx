import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProductForm, {
  formToPayload,
  getEmptyProductForm,
  validateProductForm,
} from '../components/ProductForm'
import * as api from '../services/api'

export default function NewProductPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(getEmptyProductForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validateProductForm(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setIsSubmitting(true)
    try {
      await api.createProduct(formToPayload(form))
      await Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El artículo fue añadido al catálogo.',
        confirmButtonColor: '#4f46e5',
      })
      navigate('/productos')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear',
        text: err.message || 'No se pudo guardar el producto.',
        confirmButtonColor: '#4f46e5',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Nuevo producto</h2>
        <p className="mt-1 text-sm text-slate-500">
          Completa el formulario para añadir un artículo al inventario
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ProductForm
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Crear producto"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
