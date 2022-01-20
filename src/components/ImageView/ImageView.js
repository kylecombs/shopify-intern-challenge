import { Image, ImageContainer } from '../styled/styled';

export function ImageView({ image, inModal }) {
  if (!image) return <div>Image not found</div>;

  return (
    <ImageContainer>
      <Image inModal url={image.url} />
    </ImageContainer>
  );
}
