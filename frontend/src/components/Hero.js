import './Hero.css';
import img from '../images/DSC01767-1800.jpg';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__img">
        <img
          src={img}
          alt="A jegyesfotózáson készült ez a kép még az ősz folyamán. Épp fekszünk a földön egymást átölelve, miközben a levelek hullanak ránk."
          width="900"
          height="450"
        />
      </div>
    </div>
  );
}
