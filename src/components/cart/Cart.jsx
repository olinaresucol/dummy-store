import { Link} from "react-router"
import { ShoppingBasket, Trash } from "lucide-react";
import { useStore } from "../../lib/store.js";

export const Cart = () => {
    const cart = useStore((state) => state.cart);
    const removeAllFromCart = useStore((state) => state.removeAllFromCart);
    const cartAmount = cart.reduce(
        (accumulator, producto) => accumulator + producto.quantity,
        0,
    );

    return (
        <div className="flex shrink-0 gap-2">
            <Link to="/checkout">
                <button className="relative h-11 w-11 shrink-0 cursor-pointer rounded-full border-0 bg-[#f6f5f2] p-2" aria-label="Carrito de compras">
                    <ShoppingBasket size={18} />
                    <p className="absolute top-px right-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-white">{cartAmount}</p>
                </button>
            </Link>
            <button
                className="relative h-11 w-11 shrink-0 cursor-pointer rounded-full border-0 bg-[#f6f5f2] p-2"
                aria-label="Carrito de compras"
                onClick={removeAllFromCart}
            >
                <Trash size={18} />
            </button>
        </div>
    );
};
