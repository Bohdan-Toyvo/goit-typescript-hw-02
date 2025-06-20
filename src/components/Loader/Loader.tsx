import { DotLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loading} >
      <DotLoader color="#48d0bc" cssOverride={{ margin: '40px auto' }} size={50} />
    </div>
  );
}