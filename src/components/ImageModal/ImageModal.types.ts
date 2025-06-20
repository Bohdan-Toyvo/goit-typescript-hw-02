import { Image } from '../App/App.types';

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}
