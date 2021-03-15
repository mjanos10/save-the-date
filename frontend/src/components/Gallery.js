import './Gallery.css';

import { SRLWrapper } from 'simple-react-lightbox';

export default function Gallery() {
  const images = [
    'DSC00743',
    'DSC00838',
    // 'DSC00680',
    'DSC00927',
    'DSC01453',
    'DSC01489',
    'DSC02031',
  ].map((name) => ({
    thumb: `${process.env.PUBLIC_URL}/img/${name}.jpg`,
    full: `${process.env.PUBLIC_URL}/img/${name}--thumb.jpg`,
  }));

  return (
    <SRLWrapper>
      <div class="gallery">
        {images.map((i) => (
          <div class="gallery__elem">
            <a href={i.thumb}>
              <img src={i.full} alt="" />
            </a>
          </div>
        ))}
      </div>
    </SRLWrapper>
  );
}
