import { ShoppingBasket } from "lucide-react"
import "./Header.css"

export const Header = () => {
    return (
        <div className="header">
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>
            <button className="cart-btn">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">3</p>
            </button>
        </div>
    )
}