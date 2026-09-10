import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./Input.css";

const Input = forwardRef(
    (
        {
            label,
            error,
            helperText,
            className = "",
            type = "text",
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] =
            useState(false);

        const isPassword = type === "password";

        return (
            <div className="input-group">

                {label && (
                    <label className="input-label">
                        {label}
                    </label>
                )}

                <div className="input-wrapper">

                    <input
                        ref={ref}
                        type={
                            isPassword && showPassword
                                ? "text"
                                : type
                        }
                        className={`
                            input
                            ${error ? "input-error" : ""}
                            ${isPassword ? "input-password" : ""}
                            ${className}
                        `}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {showPassword ? (
                                <FiEyeOff />
                            ) : (
                                <FiEye />
                            )}
                        </button>
                    )}

                </div>

                {error && (
                    <span className="input-message error">
                        {error}
                    </span>
                )}

                {!error && helperText && (
                    <span className="input-message">
                        {helperText}
                    </span>
                )}

            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;