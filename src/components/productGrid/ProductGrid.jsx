import "./ProductGrid.css"
import { ProductCard } from "../../components/productCard/ProductCard.jsx"

const addToCart = (producto) => {
    console.log("Producto \"" + producto.title + "\" agregado al carrito");
}

export const ProductGrid = ({ productos = [], amount, onAmountChange }) => {
    if (!productos || productos.length === 0) {
        return (
            <div className="product-grid-container">
                <p className="product-grid-empty">No se encontraron productos.</p>
            </div>
        );
    }

    return (
        <section className="product-grid-container">
            <h2 className="product-grid-title">Catálogo de Productos</h2>
            <div className="product-grid">
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
}

export default ProductGrid;