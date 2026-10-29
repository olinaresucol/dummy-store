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
        <section className="product-detail" aria-labelledby="product-title">
            <div className="product-gallery">
                <div className="product-gallery__main">
                    {selectedImage ? (
                        <img src={selectedImage} alt={product.title} />
                    ) : (
                        <span>Imagen no disponible</span>
                    )}
                </div>
                {images.length > 1 && (
                    <div
                        className="product-gallery__thumbnails"
                        aria-label="Imágenes del producto"
                    >
                        {images.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className={`product-gallery__thumbnail${selectedImage === image ? " is-selected" : ""}`}
                                onClick={() => setSelectedImage(image)}
                                aria-label={`Ver imagen ${index + 1}`}
                                aria-pressed={selectedImage === image}
                            >
                                <img src={image} alt="" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="product-info">
                <p className="product-info__category">
                    {product.brand ? `${product.brand} · ` : ""}
                    {product.category}
                </p>
                <h1 id="product-title">{product.title}</h1>
                <div
                    className="product-info__rating"
                    aria-label={`${product.rating} de 5 estrellas, ${reviews.length} reseñas`}
                >
                    <span className="product-info__stars" aria-hidden="true">
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

                <div className="product-info__price">
                    <strong>{formatPrice(product.price)}</strong>
                    {product.discountPercentage > 0 && (
                        <span>
                            {Math.round(product.discountPercentage)}% de
                            descuento
                        </span>
                    )}
                </div>

                <p className="product-info__description">
                    {product.description}
                </p>
                <p
                    className={`product-info__stock${stock === 0 ? " is-out-of-stock" : ""}`}
                >
                    <span aria-hidden="true" />
                    {stock > 0 ? `En stock · ${stock} disponibles` : "Agotado"}
                </p>

                <div className="product-info__actions">
                    <div className="product-quantity" aria-label="Cantidad">
                        <button
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
                        className="product-add-button"
                        type="button"
                        onClick={handleAddToCart}
                        disabled={stock === 0}
                    >
                        Añadir al carrito
                    </button>
                </div>

                <dl className="product-meta">
                    <div>
                        <dt>SKU</dt>
                        <dd>{product.sku || "—"}</dd>
                    </div>
                    <div>
                        <dt>Garantía</dt>
                        <dd>{product.warrantyInformation || "—"}</dd>
                    </div>
                    <div>
                        <dt>Envío</dt>
                        <dd>{product.shippingInformation || "—"}</dd>
                    </div>
                    <div>
                        <dt>Devoluciones</dt>
                        <dd>{product.returnPolicy || "—"}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
};
