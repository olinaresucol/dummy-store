export const Section = ({ title, children }) => {
    return (
        <section className="w-full">
            {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
            {children}
        </section>
    );
}