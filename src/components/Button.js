import { Styles } from "./Styles";

export default function Button({ name }) {
  return (
    <button
      className={Styles.AuthButton}
      type="submit"
    >
      {name}
    </button>
  )
}