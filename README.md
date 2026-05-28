# Panel Administrativo de E-Commerce (Inventario)

Dashboard web para que los administradores de una tienda en línea gestionen el catálogo de productos: consultar inventario, crear artículos, actualizar precio/stock y eliminar productos con confirmación.

## Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| React 19 + Vite | Framework y bundler |
| react-router-dom | Enrutamiento y rutas protegidas |
| Hooks (`useState`, `useEffect`) | Estado y ciclo de vida |
| SweetAlert2 | Confirmaciones y alertas |
| Tailwind CSS v4 | Estilos responsivos |
| LocalStorage | Sesión simulada |
| JSON Server / MockAPI | API REST de productos |
| Git + GitHub | Control de versiones |

## API mockeada

### Desarrollo local (JSON Server)

- **URL:** `http://localhost:3001/products`
- **Recurso:** `products` definido en `db.json`
- **Campos:** `id`, `nombre`, `precio`, `categoria`, `stock`, `imagen`

### Producción (MockAPI)

- **URL pública:** ``
- **Proyecto MockAPI:** `pruebaTecnica` → prefijo `prueba` → recurso `products`

En Vercel/Netlify, define la variable de entorno:

```env
VITE_API_URL=https://6a178a231878294b597b885c.mockapi.io/prueba/products
```

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/pruebaTecnica.git
cd pruebaTecnica

# Instalar dependencias
npm install

# Terminal 1 — API local
npm run api

# Terminal 2 — Frontend
npm run dev
```

Abre `http://localhost:5173`. En **Login** usa cualquier nombre de usuario y PIN (simulación).


## Estructura del proyecto

```
src/
├── components/     # UI reutilizable (ProductCard, ProductForm, SearchBar…)
├── layouts/        # DashboardLayout con Navbar
├── pages/          # Login, Inventario, Nuevo producto
├── routes/         # ProtectedRoute
└── services/       # auth.js (LocalStorage) y api.js (fetch)
```

## Funcionalidades

- **Login** (`/login`): usuario + PIN → LocalStorage → redirección al panel.
- **Rutas protegidas**: sin sesión no se accede al dashboard.
- **Navbar**: nombre del usuario y cerrar sesión.
- **GET** `/productos`: grid de tarjetas con spinner de carga.
- **POST** `/productos/nuevo`: formulario con validación (precio/stock ≥ 0).
- **PUT**: editar precio y stock desde modal.
- **DELETE**: confirmación y éxito con SweetAlert2.
- **Búsqueda**: filtro por nombre o categoría en el cliente.

## Flujo Git

| Rama | Propósito |
|------|-----------|
| `main` | Código listo para producción |
| `develop` | Integración de features |
| `feature/*` | Desarrollo por funcionalidad |

## Despliegue

- **Vercel / Netlify:** conecta el repo y configura `VITE_API_URL` apuntando a MockAPI.
- El archivo `vercel.json` incluye rewrites para SPA.


