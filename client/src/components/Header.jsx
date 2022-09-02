import { Link } from "react-router-dom";
import logo from "../images/catwiki.svg";

export default function Header() {
  return (
    <Link to="/" className="header">
      <img src={logo} alt="catwiki" />
    </Link>
  );
}
