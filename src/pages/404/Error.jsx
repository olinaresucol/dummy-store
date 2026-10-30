import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";

export const Error = () => {
    useEffect(() => {
        document.title = "Página no encontrada | Dummy Shop";
    }, []);

    return (
        <>
            <main className="grid min-h-[calc(100vh-140px)] place-items-center bg-[radial-gradient(ellipse_at_50%_42%,rgba(194,65,12,0.07),transparent_38%),#faf9f6] px-6 py-12 text-center max-[480px]:min-h-[calc(100vh-128px)] max-[480px]:px-[22px] max-[480px]:py-9">
                <section
                    className="flex max-w-[520px] flex-col items-center"
                    aria-labelledby="not-found-title"
                >
                    <div className="relative mb-7 grid h-[184px] w-[184px] place-items-center rounded-full border border-[rgba(194,65,12,0.16)] bg-[rgba(255,255,255,0.72)] text-[var(--primary)] before:absolute before:inset-3 before:rounded-full before:border before:border-dashed before:border-[rgba(194,65,12,0.2)] before:content-[''] after:absolute after:-inset-[10px] after:rounded-full after:border after:border-[rgba(194,65,12,0.08)] after:content-[''] max-[480px]:h-40 max-[480px]:w-40" aria-hidden="true">
                        <Compass
                            className="absolute top-[30px]"
                            size={42}
                            strokeWidth={1.4}
                        />
                        <span className="mt-10 text-[46px] leading-none font-bold tracking-[-0.08em] max-[480px]:text-[40px]">404</span>
                    </div>
                    <p className="mb-[10px] text-xs font-bold tracking-[0.14em] text-[var(--primary)]">PÁGINA NO ENCONTRADA</p>
                    <h1 className="text-[clamp(30px,5vw,42px)] leading-[1.12] tracking-[-0.05em] text-[#292524]" id="not-found-title">Parece que te has perdido</h1>
                    <p className="mt-[14px] max-w-[420px] text-base leading-[1.65] text-[#78716c] max-[480px]:text-[15px]">
                        La página que buscas no existe o ya no está disponible.
                        Vuelve a la tienda y encuentra algo que te guste.
                    </p>
                    <Link className="mt-7 inline-flex items-center gap-[9px] rounded-full bg-[var(--primary)] px-[22px] py-[13px] text-sm font-bold text-white no-underline transition-[background-color,transform] duration-150 ease-in-out hover:bg-[#9a3412] active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(194,65,12,0.35)]" to="/">
                        <ArrowLeft size={18} aria-hidden="true" />
                        Volver a la tienda
                    </Link>
                </section>
            </main>
        </>
    );
};
