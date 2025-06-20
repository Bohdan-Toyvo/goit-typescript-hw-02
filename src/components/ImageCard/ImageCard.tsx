import css from './ImageCard.module.css';
import { ImageCardProps } from './ImageCard.types';

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className={css.imageCard} onClick={onClick}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description || ""}
      />
    </div>
  );
}