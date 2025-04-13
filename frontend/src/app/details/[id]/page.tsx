"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link"; // Importar Link para navegación
import "./details.css";
import { useSearchParams } from "next/navigation"; // Importar para obtener query params

interface MovieDetails {
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    runtime: number; // Duración de la película en minutos
    genres: { id: number; name: string }[]; // Géneros de la película
    original_language: string; // Lengua original
    popularity: number; // Popularidad   
}

export default function DetailsPage() {
    const { id } = useParams(); // Obtener el ID de la URL
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams(); // Obtener los query params
    const category = searchParams.get("category"); // Obtener la categoría
    // obtener tambien la categoria

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: process.env.NEXT_PUBLIC_TMDB_AUTH || "",
                    },
                };
                // 'https://api.themoviedb.org/3/tv/series_id?language=en-US', options)
                
                // const response = await fetch(
                //     `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                //     options
                // );

                const url =
                    category === "movie"
                        ? `https://api.themoviedb.org/3/movie/${id}?language=en-US`
                        : `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

                const response = await fetch(url, options);


                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setMovieDetails(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar los detalles de la película:", err);
                setError("No se pudo cargar la información. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, category]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="details-container">
            <div className="details-poster">

                <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                    alt={movieDetails?.title}
                    className="details-poster"
                />
            </div>
            <div className="details-overview">
                <h1>{movieDetails?.title}</h1>
                <h2>Detalles de la película</h2>
                <p><strong>Fecha de lanzamiento:</strong> {movieDetails?.release_date}</p>
                <p><strong>Calificación:</strong> {movieDetails?.vote_average}</p>
                <p><strong>Duración:</strong> {movieDetails?.runtime} minutos</p>
                <p><strong>Géneros:</strong> {movieDetails?.genres.map((genre) => genre.name).join(", ")}</p>
                <p><strong>Lengua original:</strong> {movieDetails?.original_language}</p>
                <p><strong>Popularidad:</strong> {movieDetails?.popularity}</p>
                <p><strong>Descripción:</strong> {movieDetails?.overview}</p>
                <Link href="/user">
                    <button className="back-button">Volver a películas</button>
                </Link>
            </div>
        </div>
    );
}