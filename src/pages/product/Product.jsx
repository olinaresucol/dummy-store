import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { useStore } from "../../lib/store.js";
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
            <main className="mx-auto w-[calc(100%-48px)] max-w-[1200px] py-7 pb-16 text-[#1c1917] max-[760px]:w-[calc(100%-32px)] max-[760px]:max-w-[560px] max-[760px]:pt-5">
                {isLoading ? (
                    <p className="py-12 text-center text-[#78716c]" role="status">
                        Cargando producto...
                    </p>
                ) : error ? (
                    <section className="grid min-h-[55vh] content-center justify-items-center gap-[14px] text-center" role="alert">
                        <h1 className="text-[clamp(28px,4vw,40px)]">No encontramos este producto</h1>
                        <p className="text-[#78716c]">{error}</p>
                        <Link className="mt-2 inline-flex items-center gap-2 font-bold text-[var(--primary)] no-underline" to="/">
                            <ArrowLeft size={18} /> Volver a la tienda
                        </Link>
                    </section>
                ) : product ? (
                    <>
                        <nav
                            className="mb-[42px] flex flex-wrap items-center gap-[14px] text-[15px] text-[#57534e] max-[760px]:mb-6 max-[760px]:gap-[9px] max-[760px]:text-[13px]"
                            aria-label="Ruta de navegación"
                        >
                            <Link className="text-inherit underline-offset-[3px]" to="/">Inicio</Link>
                            <span aria-hidden="true">/</span>
                            <span>{product.category}</span>
                            <span aria-hidden="true">/</span>
                            <span className="text-[#1c1917]" aria-current="page">{product.title}</span>
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
                                className="mt-[72px] max-[760px]:mt-12"
                                aria-labelledby="reviews-title"
                            >
                                <h2 className="mb-[18px] text-[clamp(25px,3vw,34px)] tracking-[-0.04em]" id="reviews-title">Reseñas</h2>
                                <div className="grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
                                    {reviews.map((review, index) => (
                                        <article
                                            className="flex min-h-[156px] flex-col items-start rounded-[18px] bg-[#f6f5f2] p-[22px]"
                                            key={`${review.reviewerName}-${review.date}-${index}`}
                                        >
                                            <p
                                                className="mb-3 inline-flex gap-[3px] text-[var(--primary)]"
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
                                            <p className="text-[15px] leading-[1.5] text-[#292524]">
                                                {review.comment}
                                            </p>
                                            <p className="mt-auto pt-[14px] text-[13px] text-[#78716c]">
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
                                className="mt-[72px] max-[760px]:mt-12"
                                aria-labelledby="related-title"
                            >
                                <h2 className="mb-[18px] text-[clamp(25px,3vw,34px)] tracking-[-0.04em]" id="related-title">
                                    Más en {product.category}
                                </h2>
                                {isRelatedLoading ? (
                                    <p
                                        className="py-12 text-center text-[#78716c]"
                                        role="status"
                                    >
                                        Cargando productos...
                                    </p>
                                ) : relatedError ? (
                                    <p
                                        className="py-12 text-center text-[#78716c]"
                                        role="alert"
                                    >
                                        {relatedError}
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-4 gap-[22px] max-[760px]:grid-cols-2 max-[760px]:gap-y-[18px] max-[760px]:gap-x-[14px]">
                                        {relatedProducts.map(
                                            (relatedProduct) => (
                                                <Link
                                                    className="group flex min-w-0 flex-col gap-[9px] text-inherit no-underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[rgba(194,65,12,0.4)]"
                                                    key={relatedProduct.id}
                                                    to={`/product/${relatedProduct.id}`}
                                                >
                                                    <span className="grid aspect-square place-items-center overflow-hidden rounded-2xl bg-[#f6f5f2]">
                                                        <img
                                                            src={
                                                                relatedProduct.thumbnail
                                                            }
                                                            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.04] [mix-blend-mode:multiply]"
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                    </span>
                                                    <span className="text-[15px] font-bold leading-[1.35]">
                                                        {relatedProduct.title}
                                                    </span>
                                                    <span className="text-[15px] font-bold">
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
