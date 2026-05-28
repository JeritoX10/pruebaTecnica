const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)

const categoryColors = {
  Ropa: 'bg-pink-100 text-pink-700',
  Electrónica: 'bg-blue-100 text-blue-700',
  Hogar: 'bg-amber-100 text-amber-700',
}

export default function ProductCard({ product, onEdit, onDelete }) {
  const badgeClass =
    categoryColors[product.categoria] ?? 'bg-slate-100 text-slate-700'

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] bg-slate-100">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src =
              'https://placehold.co/400x300/e2e8f0/64748b?text=Sin+imagen'
          }}
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {product.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {product.nombre}
        </h3>
        <p className="text-xl font-bold text-brand-700">
          {formatPrice(Number(product.precio))}
        </p>
        <p className="text-sm text-slate-500">
          Stock disponible:{' '}
          <span className="font-semibold text-slate-700">{product.stock}</span>
        </p>

        <div className="mt-auto flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex-1 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}
