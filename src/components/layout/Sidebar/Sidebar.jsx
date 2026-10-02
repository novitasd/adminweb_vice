import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdInventory2,
  MdCategory,
  MdLocalOffer,
  MdShoppingCart,
  MdLogout,
  MdWarehouse,
  MdClose,
} from "react-icons/md";

import { useAuth } from "../../../context/AuthContext";

import "./Sidebar.css";

function Sidebar({ open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>

        {/* Botón cerrar */}
        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <MdClose />
        </button>

        {/* Navegación */}
        <nav className="sidebar-menu">

          <NavLink to="/" onClick={onClose} title="Dashboard">
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/products" onClick={onClose} title="Productos">
            <MdInventory2 />
            <span>Productos</span>
          </NavLink>

          <NavLink to="/brands" onClick={onClose} title="Marcas">
            <MdLocalOffer />
            <span>Marcas</span>
          </NavLink>

          <NavLink to="/categories" onClick={onClose} title="Categorías">
            <MdCategory />
            <span>Categorías</span>
          </NavLink>

          <NavLink to="/orders" onClick={onClose} title="Órdenes">
            <MdShoppingCart />
            <span>Órdenes</span>
          </NavLink>

          <NavLink to="/inventory" onClick={onClose} title="Inventario">
            <MdWarehouse />
            <span>Inventario</span>
          </NavLink>

        </nav>

        {/* Cerrar sesión */}
        <button
          type="button"
          className="logout-button"
          onClick={logout}
          title="Cerrar sesión"
        >
          <MdLogout />
          <span>Cerrar sesión</span>
        </button>

      </aside>
    </>
  );
}

export default Sidebar;