import './Hero.css';
import img from '../images/DSC01767.jpg';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__img">
        <img src={img} alt="" />
      </div>
    </div>
  );
}
