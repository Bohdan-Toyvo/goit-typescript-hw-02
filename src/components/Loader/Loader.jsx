import { DotLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
     return (
        <div className={css.loading} >
      <DotLoader color="#48d0bc" margin={40} size={50} />
    </div>
  );
}