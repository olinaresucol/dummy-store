import { Link } from "react-router";

export const ProductCard = ({
    producto,
    variant = "grid",
    onAddToCart,
    amount,
    onAmountChange,
}) => {
    if (!producto) return null;
    const { title, price, thumbnail, category } = producto;
    const cardWidth = {
        grid: "w-full",
        compact: "w-28",
        mini: "w-[130px] gap-2",
    }[variant] || "w-[155px]";

    return (
        <article className={`flex flex-col gap-3 ${cardWidth} text-[#1c1917]`}>
            {/* Contenedor de la imagen del producto */}
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#f6f5f2]">
                <Link
                    className="block h-full w-full"
                    to={`/product/${producto.id}`}
                    aria-label={`Ver ${title}`}
                >
                    <img className="h-full w-full object-contain" src={thumbnail} alt={title} />
                </Link>
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="flex flex-col gap-1.5">
                {/* La categoría solo se muestra en la variante 'grid' */}
                {variant === "grid" && category && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#57534e]">{category}</span>
                )}

                <h3 className="text-xs font-bold leading-[1.3]">
                    <Link className="text-inherit no-underline hover:text-[var(--primary)]" to={`/product/${producto.id}`}>{title}</Link>
                </h3>

                {/* Pie de la tarjeta: Precio y Botón según la variante */}
                <div className={`${variant === "mini" ? "mt-0" : "mt-1.5"} flex flex-col items-stretch gap-2 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between`}>
                    <span className={`font-bold ${variant === "mini" ? "text-xs" : "text-[15px]"}`}>${price}</span>

                    {variant === "grid" && (
                        <button
                            className="w-full cursor-pointer whitespace-nowrap rounded-full border border-[var(--primary)] bg-transparent px-2 py-1 text-[10px] font-semibold text-[var(--primary)] transition-[background,color] duration-150 hover:bg-[var(--primary)] hover:text-white min-[640px]:w-auto min-[640px]:px-3 min-[640px]:py-1.5 min-[640px]:text-xs"
                            onClick={() => {
                                onAmountChange(amount + 1);
                                onAddToCart?.(producto);
                            }}
                        >
                            Add to cart
                        </button>
                    )}

                    {variant === "compact" && (
                        <button
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--primary)] bg-transparent p-0 text-xs font-semibold text-[var(--primary)] transition-[background,color] duration-150 hover:bg-[var(--primary)] hover:text-white"
                            onClick={() => {
                                onAmountChange(amount + 1);
                                onAddToCart?.(producto);
                            }}
                            aria-label="Add to cart"
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

// Componente para el estado de carga (Skeleton)
export const ProductCardSkeleton = () => {
    return (
        <article className="flex w-[155px] flex-col gap-3 text-[#1c1917]">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-[#edebe7]"></div>
            <div className="mt-1 flex flex-col gap-2.5">
                <span className="block h-2 w-[85%] animate-pulse rounded-full bg-[#edebe7]"></span>
                <span className="block h-2 w-[40%] animate-pulse rounded-full bg-[#edebe7]"></span>
            </div>
        </article>
    );
};
