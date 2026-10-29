import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { Footer } from "../../components/footer/Footer";
import { useStore } from "../../lib/store.js";
import "./Product.css";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail.jsx";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

export const Product = () => {
    const { id } = useParams();
    // console.log("id param:", id);
    // const path = useLocation();
    // console.log("path", path);

    const addToCart = useStore((state) => state.addToCart);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isRelatedLoading, setIsRelatedLoading] = useState(false);
    const [relatedError, setRelatedError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const getProduct = async () => {
            setIsLoading(true);
            setError("");
            setProduct(null);
            setRelatedProducts([]);
            setRelatedError("");

            try {
                const response = await fetch(
                    `https://dummyjson.com/products/${encodeURIComponent(id)}`,
                    { signal: controller.signal },
                );

                if (!response.ok) {
                    throw new Error("No se pudo encontrar este producto.");
                }

                const data = await response.json();
                setProduct(data);
                setSelectedImage(data.images?.[0] || data.thumbnail || "");
                setQuantity(1);
                document.title = `${data.title} | Dummy Shop`;
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(
                        requestError.message ||
                            "No se pudo cargar el producto.",
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        getProduct();
        return () => controller.abort();
    }, [id]);

    useEffect(() => {
        if (!product?.category) return undefined;

        const controller = new AbortController();
        const getRelatedProducts = async () => {
            setIsRelatedLoading(true);
            setRelatedError("");

            try {
                const response = await fetch(
                    `https://dummyjson.com/products/category/${encodeURIComponent(product.category)}?limit=5`,
                    { signal: controller.signal },
                );

                if (!response.ok) {
                    throw new Error(
                        "No se pudieron cargar productos relacionados.",
                    );
                }

                const data = await response.json();
                setRelatedProducts(
                    (data.products || [])
                        .filter((item) => item.id !== product.id)
                        .slice(0, 4),
                );
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setRelatedError(
                        requestError.message ||
                            "No se pudieron cargar productos relacionados.",
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsRelatedLoading(false);
                }
            }
        };

        getRelatedProducts();
        return () => controller.abort();
    }, [product]);

    const images = product
        ? [
              ...new Set(
                  product.images?.length
                      ? product.images
                      : [product.thumbnail].filter(Boolean),
              ),
          ]
        : [];
    const stock = product?.stock ?? 0;
    const reviews = product?.reviews || [];

    const handleAddToCart = () => {
        if (product && quantity > 0 && quantity <= stock) {
            addToCart(product, quantity);
        }
    };

    return (
        <>
            <main className="product-page">
                {isLoading ? (
                    <p className="product-page__status" role="status">
                        Cargando producto...
                    </p>
                ) : error ? (
                    <section className="product-page__message" role="alert">
                        <h1>No encontramos este producto</h1>
                        <p>{error}</p>
                        <Link to="/">
                            <ArrowLeft size={18} /> Volver a la tienda
                        </Link>
                    </section>
                ) : product ? (
                    <>
                        <nav
                            className="product-breadcrumb"
                            aria-label="Ruta de navegación"
                        >
                            <Link to="/">Inicio</Link>
                            <span aria-hidden="true">/</span>
                            <span>{product.category}</span>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">{product.title}</span>
                        </nav>

                        <ProductDetail
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            product={product}
                            images={images}
                            reviews={reviews}
                            formatPrice={formatPrice}
                            stock={stock}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            handleAddToCart={handleAddToCart}
                        />

                        {reviews.length > 0 && (
                            <section
                                className="product-reviews"
                                aria-labelledby="reviews-title"
                            >
                                <h2 id="reviews-title">Reseñas</h2>
                                <div className="product-reviews__list">
                                    {reviews.map((review, index) => (
                                        <article
                                            className="product-review"
                                            key={`${review.reviewerName}-${review.date}-${index}`}
                                        >
                                            <p
                                                className="product-review__rating"
                                                aria-label={`${review.rating} de 5 estrellas`}
                                            >
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, starIndex) => (
                                                        <Star
                                                            key={starIndex}
                                                            size={15}
                                                            fill={
                                                                starIndex <
                                                                review.rating
                                                                    ? "currentColor"
                                                                    : "none"
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </p>
                                            <p className="product-review__comment">
                                                {review.comment}
                                            </p>
                                            <p className="product-review__author">
                                                {review.reviewerName} ·{" "}
                                                {new Date(
                                                    review.date,
                                                ).toLocaleDateString("es")}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                        {(isRelatedLoading ||
                            relatedProducts.length > 0 ||
                            relatedError) && (
                            <section
                                className="product-related"
                                aria-labelledby="related-title"
                            >
                                <h2 id="related-title">
                                    Más en {product.category}
                                </h2>
                                {isRelatedLoading ? (
                                    <p
                                        className="product-page__status"
                                        role="status"
                                    >
                                        Cargando productos...
                                    </p>
                                ) : relatedError ? (
                                    <p
                                        className="product-page__status"
                                        role="alert"
                                    >
                                        {relatedError}
                                    </p>
                                ) : (
                                    <div className="product-related__list">
                                        {relatedProducts.map(
                                            (relatedProduct) => (
                                                <Link
                                                    className="product-related-card"
                                                    key={relatedProduct.id}
                                                    to={`/product/${relatedProduct.id}`}
                                                >
                                                    <span className="product-related-card__image">
                                                        <img
                                                            src={
                                                                relatedProduct.thumbnail
                                                            }
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                    </span>
                                                    <span className="product-related-card__title">
                                                        {relatedProduct.title}
                                                    </span>
                                                    <span className="product-related-card__price">
                                                        {formatPrice(
                                                            relatedProduct.price,
                                                        )}
                                                    </span>
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                )}
                            </section>
                        )}
                    </>
                ) : null}
            </main>
        </>
    );
};
