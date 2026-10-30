import { ProductCard } from "../../components/productCard/ProductCard.jsx";
import { useStore } from "../../lib/store.js";
import { memo } from "react";

// const addToCart = (producto) => {
//     console.log("Producto \"" + producto.title + "\" agregado al carrito");
// }

export const ProductGrid = memo(
    ({ productos = [], amount, onAmountChange }) => {
        const addToCart = useStore((state) => state.addToCart);

        if (!productos || productos.length === 0) {
            return (
                <div className="box-border mx-auto w-full max-w-[1200px] px-4 py-5">
                    <p className="py-12 px-4 text-center text-lg text-[#6b7280]">
                        No se encontraron productos
                    </p>
                </div>
            );
        }

        return (
            <section className="box-border mx-auto w-full max-w-[1200px] px-4 py-5">
                <h2 className="mb-6 text-left text-[1.75rem] font-bold text-[#1f2937]">
                    Catálogo de Productos
                </h2>
                <div className="grid w-full grid-cols-1 gap-4 min-[320px]:grid-cols-2 sm:gap-6 min-[640px]:grid-cols-3 min-[1024px]:grid-cols-4">
                    {productos.map((producto) => (
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                            onAddToCart={addToCart}
                            amount={amount}
                            onAmountChange={onAmountChange}
                        />
                    ))}
                </div>
            </section>
        );
    },
);

export default ProductGrid;
