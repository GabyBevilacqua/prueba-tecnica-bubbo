"use client";
import { useState, useEffect, useRef } from 'react';
import apiTMDB from '../apiTMDB';
import MediaCard from './MediaCard';
import '../styles/mediaTopTen.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  // agregar otras propiedades
}

export default function MediaTopTen({ titulo, apiUrl }: { titulo: string; apiUrl: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null); // referencia al contenedor del carrusel
  const faFilmIcon = useRef(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_TMDB_AUTH || ''
          }
        };

        const response = await fetch(apiUrl, options);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.results) {
          throw new Error('La respuesta no contiene resultados');
        }

              // Normalizar los datos para que siempre usen `title`
      const normalizedMovies = data.results.map((movie: any) => ({
        ...movie,
        title: movie.title || movie.name, // Normalizar el título
      }));

        setMovies(normalizedMovies.slice(0, 10));
        setError(null);
      } catch (err) {
        console.error('Error cargando pelis:', err);
        setError('Error al cargar los datos. Por favor intenta nuevamente.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiUrl]);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="media-top-ten-container">
      <div className="media-top-ten-header">
        <h2 className="media-top-ten-title">
          {titulo}<FontAwesomeIcon icon={faFilm} className="media-top-ten-icon" />
        </h2>
      </div>

      <Slider {...settings}>
        {movies.map((movie, index) => (
          <MediaCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            index={index}
          />
        ))}
      </Slider>

    </div>
  );
}

//establecer las categorias
