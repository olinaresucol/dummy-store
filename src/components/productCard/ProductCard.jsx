import "./ProductCard.css"

export const ProductCard = ({ producto, variant = "grid", onAddToCart, amount, onAmountChange }) => {
    if (!producto) return null;
    const { title, price, thumbnail, category } = producto;

    return (
        <article className={`product-card product-card--${variant}`}>
            {/* Contenedor de la imagen del producto */}
            <div className="product-card-thumb">
                <img src={thumbnail} alt={title} />
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="product-card-body">
                {/* La categoría solo se muestra en la variante 'grid' */}
                {variant === "grid" && category && (
                    <span className="product-card-category">{category}</span>
                )}

                <h3 className="product-card-title">{title}</h3>

                {/* Pie de la tarjeta: Precio y Botón según la variante */}
                <div className="product-card-footer">
                    <span className="product-card-price">${price}</span>

                    {variant === "grid" && (
                        <button className="product-card-btn" onClick={() => { onAmountChange(amount + 1); onAddToCart?.(producto) }}>
                            Add to cart
                        </button>
                    )}

                    {variant === "compact" && (
                        <button
                            className="product-card-btn product-card-btn--icon"
                            onClick={() => { onAmountChange(amount + 1); onAddToCart?.(producto) }}
                            aria-label="Add to cart"
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </article>


    )
}


// Componente para el estado de carga (Skeleton)
export const ProductCardSkeleton = () => {
    return (
        <article className="product-card product-card--skeleton">
            <div className="product-card-thumb skeleton-block"></div>
            <div className="product-card-body">
                <span className="skeleton-line"></span>
                <span className="skeleton-line skeleton-line--short"></span>
            </div>
        </article>
    );
};