import { useRouter } from "next/navigation";
import '../styles/mediaCard.css'; // Adjust the path as necessary

type Props = {
  title: string;
  posterPath: string;
  index: number;
  id: number; // Agregar el ID del elemento
};

export default function MediaCard({ title, posterPath, index, id }: Props) {
  const router = useRouter();
// agregar la categoria
  const handleCardClick = () => {
    router.push(`/details/${id}`); // Navegar a la página de detalles
  };

  return (
    <div className="media-card" onClick={handleCardClick}>
      <span className="rank">{index + 1}</span>
      <img
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w300${posterPath}`
            : '/placeholder-image.jpg'
        }
        alt={title}
        className="poster-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
        }}
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
      </div>
    </div>
  );
}

