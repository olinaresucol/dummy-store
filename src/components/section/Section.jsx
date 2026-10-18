export const Section = ({ title, children }) => {
    return (
        <section className="section">
            {title && <h2 className="section-title">{title}</h2>}
            {children}
        </section>
    );
}