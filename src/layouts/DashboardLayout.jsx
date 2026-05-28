import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../services/auth'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-brand-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function DashboardLayout() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
              E
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
                Panel Admin
              </p>
              <h1 className="text-lg font-bold text-slate-900">E-Commerce Inventario</h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/productos" end className={navLinkClass}>
              Inventario
            </NavLink>
            <NavLink to="/productos/nuevo" className={navLinkClass}>
              Nuevo producto
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 sm:justify-end">
            <span className="hidden text-sm text-slate-500 sm:inline">
              Hola,{' '}
              <strong className="text-slate-800">{session?.username}</strong>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <p className="border-t border-slate-100 px-4 py-2 text-center text-sm text-slate-500 sm:hidden">
          Sesión: <strong>{session?.username}</strong>
        </p>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
