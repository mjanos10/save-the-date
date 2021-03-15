import './Hero2.css';
import img1 from '../images/DSC01767.jpg';
import mask from '../images/mask.png';

import SaveTheDate from './SaveTheDate';

export default function Hero() {
  return (
    <div className="hero" style={{ backgroundImage: `url("${img1}")` }}>
      <div className="hero__content">
        <SaveTheDate />
      </div>
      <div className="hero__img">
        <img src={mask} alt="" />
      </div>
    </div>
  );
}
