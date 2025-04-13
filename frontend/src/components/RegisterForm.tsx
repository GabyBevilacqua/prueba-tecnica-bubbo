"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/registerform.css";

import Swal from "sweetalert2";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0); //fortaleza de la contraseña
    const [showPassword, setShowPassword] = useState(false); //visibilidad de la contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // visibilidad de la confirmacion de contraseña
    const router = useRouter();

    // Función para evaluar la fortaleza de la contraseña
    const evaluatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++; // Longitud mínima
        if (/[A-Z]/.test(password)) strength++; // Al menos una letra mayúscula
        if (/[a-z]/.test(password)) strength++; // Al menos una letra minúscula
        if (/[0-9]/.test(password)) strength++; // Al menos un número
        if (/[^A-Za-z0-9]/.test(password)) strength++; // Al menos un carácter especial
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        evaluatePasswordStrength(newPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden",
            });
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SIGNUP}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }), // enviar userName, userEmail y password
            });

            if (response.ok) {
              //  const userData = { name, email }; // Datos del usuario
               // localStorage.setItem("user", JSON.stringify(userData)); // Guardar en localStorage
               // console.log("Datos guardados en localStorage:", userData); // Verificar en la consola
                
                Swal.fire({
                    title: "Usuario creado satisfactoriamente",
                    text: "Haz inicio de sesión para continuar",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then(() => {
                    router.push("/");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al registrar el usuario. Inténtalo de nuevo.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal. Por favor, inténtalo más tarde.",
            });
            console.error("Error:", error);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">REGISTRARSE</h2>
                <div className="register-field">
                    <label htmlFor="userName" className="register-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="userName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="email" className="register-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="password" className="register-label">Contraseña</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="register-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="register-input"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <div className="password-strength-bar">
                        <div className={`strength-${passwordStrength}`}></div>
                    </div>
                    <p className="password-requirements">
                        La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.
                    </p>
                </div>
                <div className="register-field">
                    <label htmlFor="confirm-password" className="register-label">Confirmar Contraseña</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="register-button">Registrarse</button>
                <button
                    type="button"
                    className="register-button"
                    onClick={() => router.push("/")}
                >
                    Volver al inicio
                </button>
            </form>
        </div>
    );
}