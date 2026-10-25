import React, { useEffect } from "react";
import "./Button.css";

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) => {
    useEffect(() => {
        console.log('Button Montado')
        return () => {
            console.log('Button Desmontado')
        }
    }, [])


    // Generación dinámica de clases BEM
    const buttonClasses = [
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? "btn--fullwidth" : "",
        loading ? "btn--loading" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {/* Indicador de carga (Spinner SVG integrado) */}
            {loading && (
                <span className="btn-spinner" aria-hidden="true">
                    <svg
                        className="spinner-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="spinner-track"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="spinner-head"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                </span>
            )}

            <span className="btn-content">{children}</span>
        </button>
    );
};

export default Button;