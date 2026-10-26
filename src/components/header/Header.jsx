import SearchBar from "../searchBar/SearchBar";
import "./Header.css"
import { useEffect } from "react";
import { Cart } from "../cart/Cart.jsx";

export const Header = () => {
    // useEffect(() => {
    //     console.log('Header montado')
    // }, [])

    return (
        <header className="header">
            {/* Logo */}
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>

            {/* Barra de Búsqueda */}
            <SearchBar />

            <Cart />
        </header>
    );
};