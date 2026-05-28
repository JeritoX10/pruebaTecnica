import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isAuthenticated, saveSession } from '../services/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/productos', { replace: true })
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'Ingresa tu nombre de usuario para continuar.',
        confirmButtonColor: '#4f46e5',
      })
      return
    }

    if (!pin.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'PIN requerido',
        text: 'Ingresa tu PIN de acceso (simulación).',
        confirmButtonColor: '#4f46e5',
      })
      return
    }

    saveSession(username.trim())
    navigate('/productos', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-800 via-brand-700 to-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
            E
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-slate-500">
            Panel administrativo de inventario — acceso simulado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="Tu nombre"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="pin" className="mb-1 block text-sm font-medium text-slate-700">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="Cualquier PIN válido"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Ingresar al panel
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo: usa cualquier usuario y PIN. La sesión se guarda en LocalStorage.
        </p>
      </div>
    </div>
  )
}
