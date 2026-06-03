import css from "./Loader.module.css";
import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={css["wrapper"]}>
      <TailSpin
        height="40"
        width="40"
        color="#0d6efd"
        ariaLabel="tail-spin-loading"
        visible={true}
      />
    </div>
  );
}
