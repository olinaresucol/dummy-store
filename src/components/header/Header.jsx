import SearchBar from "../searchBar/SearchBar";
import { Cart } from "../cart/Cart.jsx";
import { Link } from "react-router";

export const Header = () => {
    // useEffect(() => {
    //     console.log('Header montado')
    // }, [])

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 md:flex-nowrap md:p-[22px]">
            {/* Logo */}
            <Link to="/" className="text-inherit no-underline">
                <p className="whitespace-nowrap">
                    Dummy <strong className="text-[var(--primary)]">Shop</strong>
                </p>
            </Link>

            {/* Barra de Búsqueda */}
            <SearchBar />

            <Cart />
        </header>
    );
};
