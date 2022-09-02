import logo from "../images/catwiki.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={logo} alt="catwiki" className="inverted" />
      </div>
      <div className="footer__credit white">Aydın BULUT {new Date().getFullYear()}</div>
    </div>
  );
}
