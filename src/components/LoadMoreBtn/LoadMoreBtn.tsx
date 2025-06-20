import css from './LoadMoreBtn.module.css';
import { LoadMoreBtnProps } from './LoadMoreBtn.types';

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <>
      <button type="button" onClick={onClick} className={css.button}>
        Load more
      </button>
    </>
  );
}