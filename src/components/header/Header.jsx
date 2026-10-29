import SearchBar from "../searchBar/SearchBar";
import "./Header.css";
import { Cart } from "../cart/Cart.jsx";
import { Link, NavLink } from "react-router";

export const Header = () => {
    // useEffect(() => {
    //     console.log('Header montado')
    // }, [])

    return (
        <header className="header">
            {/* Logo */}
            <Link to="/" className="anchor-to-home">
                <p className="logo">
                    Dummy <strong>Shop</strong>
                </p>
            </Link>

            {/* Barra de Búsqueda */}
            <SearchBar />

            <Cart />
        </header>
    );
};
