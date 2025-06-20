import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { useEffect } from 'react';
import { ImageModalProps } from './ImageModal.types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
  },
};

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!image) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onClose}
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description || ""} className={css.img} />
    </Modal>
  );
}