import { useEffect } from "react";

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


    const variantClasses = {
        primary: "bg-[var(--primary)] text-white hover:not-disabled:bg-[#9a3412]",
    };
    const sizeClasses = {
        sm: "min-h-8 px-[14px] py-[6px] text-xs",
        md: "min-h-[42px] px-[22px] py-[10px] text-sm",
        lg: "min-h-[50px] px-7 py-[14px] text-base",
    };
    const buttonClasses = [
        "inline-flex select-none items-center justify-center gap-2 rounded-full border-0 text-center font-bold leading-[1.2] transition-[background-color,transform,opacity] duration-150 ease-in-out active:not-disabled:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e5e5e0] disabled:text-[#a8a29e]",
        variantClasses[variant] || "",
        sizeClasses[size] || "",
        fullWidth ? "flex w-full" : "",
        loading ? "cursor-wait opacity-90" : "",
        className,
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
                <span className="inline-flex items-center justify-center" aria-hidden="true">
                    <svg
                        className="h-[1.1em] w-[1.1em] animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="opacity-95"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                </span>
            )}

            <span>{children}</span>
        </button>
    );
};

export default Button;