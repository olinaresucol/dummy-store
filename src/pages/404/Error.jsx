import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";
import { Footer } from "../../components/footer/Footer";
import "./Error.css";

export const Error = () => {
    useEffect(() => {
        document.title = "Página no encontrada | Dummy Shop";
    }, []);

    return (
        <>
            <main className="not-found">
                <section
                    className="not-found__content"
                    aria-labelledby="not-found-title"
                >
                    <div className="not-found__illustration" aria-hidden="true">
                        <Compass
                            className="not-found__compass"
                            size={42}
                            strokeWidth={1.4}
                        />
                        <span>404</span>
                    </div>
                    <p className="not-found__eyebrow">PÁGINA NO ENCONTRADA</p>
                    <h1 id="not-found-title">Parece que te has perdido</h1>
                    <p className="not-found__description">
                        La página que buscas no existe o ya no está disponible.
                        Vuelve a la tienda y encuentra algo que te guste.
                    </p>
                    <Link className="not-found__link" to="/">
                        <ArrowLeft size={18} aria-hidden="true" />
                        Volver a la tienda
                    </Link>
                </section>
            </main>
        </>
    );
};
