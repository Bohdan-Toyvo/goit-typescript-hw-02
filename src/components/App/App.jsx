import React from 'react';
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

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (newQuery) => {
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

  const loadImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchImages(query, page);
      setImages((prevImages) => {
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

      const totalLoaded = (page - 1) * 12 + data.results.length;
      if (totalLoaded >= data.total && data.total !== 0) {
        toast('End of gallery.');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
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
