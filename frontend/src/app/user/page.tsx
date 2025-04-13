// SI EL LOGIN ES EXITOSO EL BACKEND DEVUELVE UNA COOKIE CON LOS DATOS DE USUARIO Y SE PODRÁ ACCEDER A ESTA RUTA
// QUE CORRESPONDE A LOCALHOST:3000/USER
// LOS CARRUSELES TIENEN QUE SER AGREGADES CON PROGRAMACIÓN DECLARATIVA, ES DECIR PASAR DOS ARGUMENTOS:
//        1_EL NOMBRE DEL CARROUSEL DE CARA AL USUARIO. Ejem: Top Ten Netflix, Top Ten Estrenos Cine.
//        2_LA DIRECCIÓN DE LA API. ESTÁN EN  apiTMDB.ts 

"use client";
import apiTMDB from "@/apiTMDB";
import MediaTopTen from "@/components/MediaTopTen";
import "./user.css";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Para manejar cookies
const Cookies = require("js-cookie");

export default function UserPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>("Sin nombre"); // Valor predeterminado
  const [userEmail, setUserEmail] = useState<string | null>("Sin email");
  const faCircle = useRef(null);

  useGSAP(() => {
    gsap.to(faCircle.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,  // Rotación infinita
      ease: "linear", // Hace que la animación sea fluida
    });

  });
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("Datos recuperados de localStorage:", userData); // Verificar en la consola

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.name || "Usuario");
        setUserEmail(parsedData.email || "Sin email");
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // alerta de confirmacion de cerrar sesion
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar la cookie de autenticación
        Cookies.remove("auth");

        // Mostrar alerta de éxito
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          // Redirigir al usuario a la página de inicio de sesión
          router.push("/");
        });
      }
    });
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <div className="user-texts">
          {/* Recuperar datos de usuario del backend*/}
          <h1>Bienvenido a HomeCinema</h1>
          <p><strong>Nombre : </strong> {userName || "Cargando..."}</p>
          <p><strong>Email : </strong> {userEmail || "Cargando..."}</p>
        </div>
        {/* Botón de cerrar sesión */}
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon ref={faCircle} icon={faCircleXmark} />
        </button>
      </div>
      
      {/* Aquí mostrar los tres carruseles con las 10 primeras peliculas de la API de TMDB*/}

      {/* <MediaTopTen titulo="Titulo" apiKey={apiTMDB.topTenMovie}/> */}

      <MediaTopTen
        titulo="Top 10 Películas Populares"
        apiUrl={apiTMDB.topTenMovie}
        category="movie" // Agregar categoría para poder definir la ruta de la api
      />

      <MediaTopTen
        titulo="Top 10 Series Populares"
        apiUrl={apiTMDB.topTenSerie}
        category="tv" // Agregar categoría para poder definir la ruta de la api
      />

      <MediaTopTen
        titulo="Top 10 Próximos Estrenos"
        apiUrl={apiTMDB.moviesUpcoming}
        category="movie" // Agregar categoría para poder definir la ruta de la api
      />
    </div>
  );
}
// pasar las categorias a cada mediatopten

