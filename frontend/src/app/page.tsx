// LOS ENDPOINTS DEL BACKEND ESTÁN COMO UNA VARIABLE DE ENTORNO EN .env.local

"use client";
import Image from "next/image";
import "./home.css";
import LoginForm from "@/components/LoginForm";

// import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <>
      {/* <h1>Home</h1>
      <strong>
        Aquí se debe mostrar defecto el formulario de inicio de sesión
      </strong>
      <strong>
        A su vez tienes que poder acceder al formulario de registro
      </strong>
      <strong> Si hay un login exitoso la web te redirecciona a /user </strong> */}
      <h1 className="home-title">Que bueno verte por aquí!</h1>

    <LoginForm />
    </>
  );
}
