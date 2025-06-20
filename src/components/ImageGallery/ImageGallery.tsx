import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../App/App.types';
import { ImageGalleryProps } from './ImageGallery.types';

export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <ul className={css.gallery} >
      {images.map((image: Image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}
