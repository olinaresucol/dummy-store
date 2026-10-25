import SearchBar from "../searchBar/SearchBar";
import { ShoppingBasket } from "lucide-react"
import "./Header.css"
import { useEffect } from "react";

export const Header = ({ amount }) => {
    useEffect(() => {
        console.log('Header montado')
    }, [])
    return (
        <header className="header">
            {/* Logo */}
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>

            {/* Barra de Búsqueda */}
            <SearchBar />

            {/* Botón del Carrito */}
            <button className="cart-btn" aria-label="Carrito de compras">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">{amount}</p>
            </button>
        </header>
    );
};