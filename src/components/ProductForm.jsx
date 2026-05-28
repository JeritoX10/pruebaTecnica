const CATEGORIES = ['Ropa', 'Electrónica', 'Hogar']

const emptyForm = {
  nombre: '',
  precio: '',
  categoria: 'Electrónica',
  stock: '',
  imagen: '',
}

export function getEmptyProductForm() {
  return { ...emptyForm }
}

export function validateProductForm(form) {
  const errors = {}

  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
  if (!form.imagen.trim()) errors.imagen = 'La URL de imagen es obligatoria'

  const precio = Number(form.precio)
  if (form.precio === '' || Number.isNaN(precio)) {
    errors.precio = 'Ingresa un precio válido'
  } else if (precio < 0) {
    errors.precio = 'El precio no puede ser negativo'
  }

  const stock = Number(form.stock)
  if (form.stock === '' || Number.isNaN(stock)) {
    errors.stock = 'Ingresa un stock válido'
  } else if (stock < 0) {
    errors.stock = 'El stock no puede ser negativo'
  }

  return errors
}

export function formToPayload(form) {
  return {
    nombre: form.nombre.trim(),
    precio: Number(form.precio),
    categoria: form.categoria,
    stock: Number(form.stock),
    imagen: form.imagen.trim(),
  }
}

export default function ProductForm({
  form,
  errors,
  onChange,
  onSubmit,
  submitLabel,
  isSubmitting,
}) {
  const fieldClass = (name) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
      errors[name]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100'
    }`

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-slate-700">
          Nombre del producto
        </label>
        <input
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          className={fieldClass('nombre')}
          placeholder="Ej. Auriculares inalámbricos"
        />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="precio" className="mb-1 block text-sm font-medium text-slate-700">
            Precio (COP)
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            value={form.precio}
            onChange={onChange}
            className={fieldClass('precio')}
            placeholder="0"
          />
          {errors.precio && (
            <p className="mt-1 text-xs text-red-600">{errors.precio}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={onChange}
            className={fieldClass('stock')}
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-600">{errors.stock}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-slate-700">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          value={form.categoria}
          onChange={onChange}
          className={fieldClass('categoria')}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="imagen" className="mb-1 block text-sm font-medium text-slate-700">
          URL de imagen
        </label>
        <input
          id="imagen"
          name="imagen"
          type="url"
          value={form.imagen}
          onChange={onChange}
          className={fieldClass('imagen')}
          placeholder="https://..."
        />
        {errors.imagen && (
          <p className="mt-1 text-xs text-red-600">{errors.imagen}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}
