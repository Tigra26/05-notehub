import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css["text"]}>An error occurred, please try again...</p>;
}
