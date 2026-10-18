import { ShoppingBasket, Search } from "lucide-react"
import "./Header.css"

export const Header = ({ amount, searchQuery, onSearchChange }) => {
    return (
        <header className="header">
            {/* Logo */}
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>

            {/* Barra de Búsqueda */}
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery || ""}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                />
            </div>

            {/* Botón del Carrito */}
            <button className="cart-btn" aria-label="Carrito de compras">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">{amount}</p>
            </button>
        </header>
    );
};