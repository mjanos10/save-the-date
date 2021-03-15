import './Gallery.css';

import { SRLWrapper } from 'simple-react-lightbox';

export default function Gallery() {
  const images = [
    'DSC00743',
    'DSC00838',
    'DSC00927',
    'DSC01453',
    'DSC01489',
    'DSC02031',
  ].map((name) => ({
    name,
    thumb: `${process.env.PUBLIC_URL}/img/${name}--thumb.jpg`,
    full: `${process.env.PUBLIC_URL}/img/${name}--1920.jpg`,
  }));

  const options = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
    },
  };

  return (
    <SRLWrapper options={options}>
      <div className="gallery">
        {images.map((i) => (
          <div className="gallery__elem" key={i.name}>
            <a href={i.full}>
              <img src={i.thumb} alt="" />
            </a>
          </div>
        ))}
      </div>
    </SRLWrapper>
  );
}
