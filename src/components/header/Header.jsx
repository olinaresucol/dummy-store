import SearchBar from "../searchBar/SearchBar";
import { ShoppingBasket } from "lucide-react"
import "./Header.css"

export const Header = ({ amount, searchQuery, onSearchChange }) => {
    return (
        <header className="header">
            {/* Logo */}
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>

            {/* Barra de Búsqueda */}
            <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

            {/* Botón del Carrito */}
            <button className="cart-btn" aria-label="Carrito de compras">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">{amount}</p>
            </button>
        </header>
    );
};