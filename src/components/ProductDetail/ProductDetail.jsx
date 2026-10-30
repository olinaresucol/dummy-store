import { Minus, Plus, Star } from "lucide-react";

export const ProductDetail = ({
    selectedImage,
    setSelectedImage,
    product,
    images,
    reviews,
    formatPrice,
    stock,
    quantity,
    setQuantity,
    handleAddToCart,
}) => {
    return (
        <section className="grid grid-cols-1 items-start gap-7 min-[761px]:grid-cols-2 min-[761px]:gap-[clamp(32px,4vw,64px)]" aria-labelledby="product-title">
            <div className="min-w-0 max-w-[520px]">
                <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-[22px] bg-[#f6f5f2] text-[#78716c] max-[760px]:max-h-[560px]">
                    {selectedImage ? (
                        <img className="h-full w-full object-contain [mix-blend-mode:multiply]" src={selectedImage} alt={product.title} />
                    ) : (
                        <span>Imagen no disponible</span>
                    )}
                </div>
                {images.length > 1 && (
                    <div
                        className="mt-[14px] grid grid-cols-4 gap-3"
                        aria-label="Imágenes del producto"
                    >
                        {images.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className={`aspect-square cursor-pointer overflow-hidden rounded-[13px] border-2 bg-[#f6f5f2] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(194,65,12,0.4)] ${selectedImage === image ? "border-[#1c1917]" : "border-[#e7e5e4]"}`}
                                onClick={() => setSelectedImage(image)}
                                aria-label={`Ver imagen ${index + 1}`}
                                aria-pressed={selectedImage === image}
                            >
                                <img className="h-full w-full object-contain [mix-blend-mode:multiply]" src={image} alt="" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="min-w-0 pt-0.5">
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#57534e]">
                    {product.brand ? `${product.brand} · ` : ""}
                    {product.category}
                </p>
                <h1 className="text-[clamp(28px,3.5vw,46px)] leading-[1.08] tracking-[-0.055em] max-[760px]:text-[clamp(24px,7vw,38px)]" id="product-title">{product.title}</h1>
                <div
                    className="mt-[14px] flex flex-wrap items-center gap-[14px] text-[15px] text-[#57534e]"
                    aria-label={`${product.rating} de 5 estrellas, ${reviews.length} reseñas`}
                >
                    <span className="inline-flex gap-[3px] text-[var(--primary)]" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Star
                                key={index}
                                size={18}
                                fill={
                                    index < Math.round(product.rating || 0)
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        ))}
                    </span>
                    <span>
                        {product.rating ?? "—"} · {reviews.length} reseñas
                    </span>
                </div>

                <div className="mt-[38px] flex flex-wrap items-center gap-[18px] max-[760px]:mt-[26px]">
                    <strong className="text-[clamp(26px,2.8vw,38px)] tracking-[-0.04em]">{formatPrice(product.price)}</strong>
                    {product.discountPercentage > 0 && (
                        <span className="rounded-full bg-[#fbf1eb] px-[10px] py-[5px] text-[13px] font-bold text-[#9a3412]">
                            {Math.round(product.discountPercentage)}% de
                            descuento
                        </span>
                    )}
                </div>

                <p className="mt-[22px] text-base leading-[1.65] text-[#57534e]">
                    {product.description}
                </p>
                <p
                    className={`mt-6 flex items-center gap-[9px] text-[15px] ${stock === 0 ? "text-[#b91c1c]" : "text-[#166534]"}`}
                >
                    <span className={`h-[9px] w-[9px] shrink-0 rounded-full ${stock === 0 ? "bg-[#b91c1c]" : "bg-[#15803d]"}`} aria-hidden="true" />
                    {stock > 0 ? `En stock · ${stock} disponibles` : "Agotado"}
                </p>

                <div className="mt-5 grid grid-cols-[minmax(112px,0.45fr)_minmax(0,1.7fr)] gap-[14px] max-[420px]:grid-cols-[minmax(110px,0.7fr)_minmax(0,1.3fr)] max-[420px]:gap-[9px]">
                    <div className="grid min-h-[54px] grid-cols-[38px_minmax(28px,1fr)_38px] items-center rounded-full border border-[#e7e5e4] bg-[#f6f5f2] px-2 max-[420px]:grid-cols-[30px_minmax(24px,1fr)_30px] max-[420px]:px-1" aria-label="Cantidad">
                        <button
                            className="grid h-[34px] w-[34px] place-items-center rounded-full border-0 bg-transparent text-[#1c1917] enabled:cursor-pointer disabled:cursor-not-allowed disabled:text-[#a8a29e] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(194,65,12,0.4)] max-[420px]:h-8 max-[420px]:w-7"
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.max(1, current - 1),
                                )
                            }
                            disabled={quantity <= 1}
                            aria-label="Disminuir cantidad"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            className="w-full min-w-0 appearance-none border-0 bg-transparent text-center text-[15px] font-bold text-inherit outline-none"
                            min="1"
                            max={stock}
                            value={quantity}
                            onChange={(event) => {
                                const nextQuantity = Number(event.target.value);
                                if (
                                    Number.isInteger(nextQuantity) &&
                                    nextQuantity >= 1 &&
                                    nextQuantity <= stock
                                ) {
                                    setQuantity(nextQuantity);
                                }
                            }}
                            aria-label="Cantidad de productos"
                        />
                        <button
                            className="grid h-[34px] w-[34px] place-items-center rounded-full border-0 bg-transparent text-[#1c1917] enabled:cursor-pointer disabled:cursor-not-allowed disabled:text-[#a8a29e] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(194,65,12,0.4)] max-[420px]:h-8 max-[420px]:w-7"
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.min(stock, current + 1),
                                )
                            }
                            disabled={quantity >= stock}
                            aria-label="Aumentar cantidad"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <button
                        className="min-h-[54px] cursor-pointer rounded-full border-0 bg-[var(--primary)] px-6 py-3 text-[15px] font-bold tracking-[0.12em] text-white transition-[background-color,transform] duration-150 ease-in-out hover:enabled:bg-[#9a3412] active:enabled:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#d6d3d1] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(194,65,12,0.4)] max-[420px]:px-3 max-[420px]:py-[10px] max-[420px]:text-[13px] max-[420px]:tracking-[0.04em]"
                        type="button"
                        onClick={handleAddToCart}
                        disabled={stock === 0}
                    >
                        Añadir al carrito
                    </button>
                </div>

                <dl className="mt-[22px] grid grid-cols-2 gap-x-6 gap-y-[18px] rounded-[18px] bg-[#f6f5f2] p-6 max-[420px]:gap-4 max-[420px]:p-[18px]">
                    <div>
                        <dt className="mb-1 text-sm text-[#78716c]">SKU</dt>
                        <dd className="text-sm leading-[1.45]">{product.sku || "—"}</dd>
                    </div>
                    <div>
                        <dt className="mb-1 text-sm text-[#78716c]">Garantía</dt>
                        <dd className="text-sm leading-[1.45]">{product.warrantyInformation || "—"}</dd>
                    </div>
                    <div>
                        <dt className="mb-1 text-sm text-[#78716c]">Envío</dt>
                        <dd className="text-sm leading-[1.45]">{product.shippingInformation || "—"}</dd>
                    </div>
                    <div>
                        <dt className="mb-1 text-sm text-[#78716c]">Devoluciones</dt>
                        <dd className="text-sm leading-[1.45]">{product.returnPolicy || "—"}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
};
