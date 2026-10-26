import { ShoppingBasket, Trash } from "lucide-react"
import { useStore } from "../../lib/store.js";

export const Cart = () => {
    const cart = useStore((state) => state.cart)
    const removeAllFromCart = useStore((state) => state.removeAllFromCart)
    const cartAmount = cart.reduce((accumulator, producto) => accumulator + producto.quantity, 0)

    return (
        <div>
            <button className="cart-btn" aria-label="Carrito de compras">
                <ShoppingBasket size={18} />
                <p className="cart-btn-count">{cartAmount}</p>
            </button >
            <button className="cart-btn" aria-label="Carrito de compras" onClick={removeAllFromCart}>
                <Trash size={18} />
            </button>
        </div>
    )
}