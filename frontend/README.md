# PRUEBA TECNICA BUBBO WEB
## Autor: Aitor Iriarte

## INSTALACIÓN DEL FRONTEND

1. cd frontend

2. npm install

3. npm run dev

El frontend correrá en 'localhost:3000'


## INSTALACIÓN DEL BACKEND

 1. cd backend

 2. npm install

 3. nest start --watch

 4. Para mayor compatibilidad la base de datos está simulada en el backend con un json. Hay que copiar (justo después ejecutar el comando anterior y con el backend ya corriendo) en 'backend/dist' la carpeta 'db' que hay en 'backend/src/'

 El backend correrá en 'localhost:7000'

 ## OBJETIVO DE LA PRUEBA
 1. Simular un acceso de usario.
 2. Hacer un carrusel con la data de TMDB

 - La prueba es exclusiva de Front. 

 - La ruta 'localhost:3000/user' está protegida por un middleware ('src/app/middleware.ts') de autenticación. Este middleware verifica si el usuario ha iniciado sesión correctamente al buscar una cookie llamada 'auth'. Si la cookie es válida, el usuario puede acceder a la ruta. De lo contrario, será redirigido o se le mostrará un mensaje de error.
 
 - Accediendo a 'localhost:3000/user' debemos tener un carrousel con un Top 10 de una de las llamadas a la API que hay en '.env.local'.
 El frontend utiliza la API de TMDB para obtener información sobre películas y series populares. Esta API nos proporciona datos como el título, el póster, la fecha de estreno y una sinopsis. En esta prueba, utilizaremos la API para crear un carrusel con las 10 películas más populares del momento. En '.env.local' también tienes el bearer token como una variable de entorno llamada NEXT_PUBLIC_TMDB_AUTH.

 ### Ejemplo de un fetch simple:

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ''
  }
};

fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


### Output esperado:

{
  "page": 1,
  "results": [
    {
      "backdrop_path": "/xZm5YUNY3PlYD1Q4k7X8zd2V4AK.jpg",
      "id": 993710,
      "title": "Back in Action",
      "original_title": "Back in Action",
      "overview": "Fifteen years after vanishing from the CIA to start a family, elite spies Matt and Emily jump back into the world of espionage when their cover is blown.",
      "poster_path": "/mLxIlIf2Gopht23v5VFNpQZ2Rue.jpg",
      "media_type": "movie",
      "adult": false,
      "original_language": "en",
      "genre_ids": [
        28,
        35
      ],
      "popularity": 216.023,
      "release_date": "2025-01-17",
      "video": false,
      "vote_average": 6.3,
      "vote_count": 9
    },
    {
      "backdrop_path": "/iFsWkmAcu1QcMJ2LhqN8bU0Oj7.jpg",
      "id": 539972,
      "title": "Kraven the Hunter",
      "original_title": "Kraven the Hunter",
      "overview": "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
      "poster_path": "/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
      "media_type": "movie",
      "adult": false,
      "original_language": "en",
      "genre_ids": [
        28,
        12,
        53
      ],
      "popularity": 1682.267,
      "release_date": "2024-12-11",
      "video": false,
      "vote_average": 6.221,
      "vote_count": 448
    },

 - Hemos elegido Next.js y TypeScript para construir un frontend sólido y eficiente. Utilizamos componentes para crear una interfaz de usuario modular y fácil de mantener y TypesScript para construir un codigo fuerte. La calidad del código, componetización, usos de estados, programación declarativa, etc, son obligatorias. 