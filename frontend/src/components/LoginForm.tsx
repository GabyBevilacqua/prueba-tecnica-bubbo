"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/loginform.css";

import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // estado de carga
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // activar el spinner
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular retraso de 2 segundos porque sino parece que no esta funcionando el login
      const response = await fetch(`${process.env.NEXT_PUBLIC_SIGNIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // incluir cookies en la solicitud
        // enviar las credenciales de inicio de sesión al backend
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos del backend:", data);
        console.log("Cookies recibidas:", document.cookie);
        // Guardar el name y email en localStorage
        if (data.user.name && data.user.email) {
          
          localStorage.setItem("user", JSON.stringify({ name: data.user.name, email: data.user.email }));
        } 
        //alerta de éxito
        Swal.fire({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a la página de usuario",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          router.push("/user"); // redirige a /user en caso de éxito
        });
      } else {
        // alerta de error si las credenciales son incorrectas
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      // alerta de error si ocurre un problema en la solicitud
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal. Por favor, inténtalo más tarde.",
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Desactivar el spinner
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register"); // redirige al formulario de registro
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">INICIAR SESION</h2>
        <div className="login-field">
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password" className="login-label">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <button onClick={handleRegisterRedirect} className="register-button">
          ¿No tienes cuenta? Regístrate pulsando aquí
        </button>
        {isLoading && (
        <div className="spinner-container">
          <ClipLoader color="#4299e1" size={40} />
        </div>
      )}
      </form>
  
    </div>
  );
}