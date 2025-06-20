
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import css from './App.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { toast, Toaster } from 'react-hot-toast';
import { fetchImages } from '../../images-api';
import { Image, FetchDataResponse } from './App.types';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleSubmit = (newQuery: string): void => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setTotalHits(0);
      setError(null);
    }
  };

  useEffect(() => {
    if (query) {
      loadImages();
    }
  }, [query, page]);

  const loadImages = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data: FetchDataResponse = await fetchImages(query, page);
      setImages((prevImages: Image[]): Image[] => {
        if (page === 1) {
          return data.results;
        } else {
          return [...prevImages, ...data.results];
        }
      });
      setTotalHits(data.total);
      if (data.results.length === 0) {
        toast.error('No results found.');
      }
      setError(null);

      const totalLoaded: number = (page - 1) * 12 + data.results.length;
      if (totalLoaded >= data.total && data.total !== 0) {
        toast('End of gallery.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(String(error)));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreClick = (): void => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const handleImageClick = (image: Image): void => {
    setSelectedImage(image);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const shouldShowLoadMore = images.length > 0 && images.length < totalHits;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {isLoading && <Loader />}
      {shouldShowLoadMore && !isLoading && <LoadMoreBtn onClick={handleLoadMoreClick} />}
      {selectedImage && (
        <ImageModal isOpen={true} onClose={closeModal} image={selectedImage} />
      )}
      <Toaster />
    </div>
  );
}
