import { ShoppingBasket } from "lucide-react"
import "./Header.css"

export const Header = (props) => {
    const { amount } = props
    return (
        <div className="header">
            <p className="logo">
                Dummy <strong>Shop</strong>
            </p>
            <button className="cart-btn">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">{amount}</p>
            </button>
        </div>
    )
}