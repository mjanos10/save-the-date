import './Header.css';

import img from '../images/hearts.png';

export default function Header() {
  return (
    <header className="header">
      <div className="header__img">
        <img src={img} alt="" />
      </div>
      <h1 className="header__title">Evelin & János</h1>
      <p className="header__details">2021. 09. 03</p>
      <p>Lajosmizse, Ezüst Villa Rendezvényház</p>
    </header>
  );
}
