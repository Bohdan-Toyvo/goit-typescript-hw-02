import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'; 

export default function ImageGallery({ images, onImageClick }) {
  if (!images || images.length === 0) {
    return null; 
  }

  return (
    <ul className={css.gallery} >
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}
