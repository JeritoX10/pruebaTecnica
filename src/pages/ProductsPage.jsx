import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import EditProductModal from '../components/EditProductModal'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import * as api from '../services/api'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'No se pudo cargar el inventario')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase().trim()
    if (!term) return true
    return (
      product.nombre?.toLowerCase().includes(term) ||
      product.categoria?.toLowerCase().includes(term)
    )
  })

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      html: `Se eliminará <strong>${product.nombre}</strong> del catálogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await api.deleteProduct(product.id)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
      await Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El artículo fue removido del catálogo.',
        confirmButtonColor: '#4f46e5',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar',
        text: err.message || 'Intenta de nuevo más tarde.',
        confirmButtonColor: '#4f46e5',
      })
    }
  }

  const handleSaveEdit = async (updated) => {
    setIsSaving(true)
    try {
      const saved = await api.updateProduct(updated.id, updated)
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, ...saved } : p))
      )
      setEditingProduct(null)
      Swal.fire({
        icon: 'success',
        title: 'Cambios guardados',
        text: 'Precio y stock actualizados correctamente.',
        confirmButtonColor: '#4f46e5',
        timer: 1800,
        showConfirmButton: false,
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: err.message || 'No se pudo guardar los cambios.',
        confirmButtonColor: '#4f46e5',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inventario</h2>
          <p className="mt-1 text-sm text-slate-500">
            Gestiona el catálogo de productos de la tienda
          </p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <LoadingSpinner label="Cargando inventario..." />}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">{error}</p>
          <p className="mt-2 text-sm text-red-600">
            Verifica que la API esté activa (JSON Server o MockAPI).
          </p>
          <button
            type="button"
            onClick={loadProducts}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-slate-600">
            {search
              ? 'No hay productos que coincidan con tu búsqueda.'
              : 'No hay productos en el catálogo.'}
          </p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}

      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
        isSaving={isSaving}
      />
    </div>
  )
}
