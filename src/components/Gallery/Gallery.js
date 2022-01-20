import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../lotties/29238-rocket-in-space-transparent-background.json';
import Heart from '../Heart/Heart';
import { ImageLink, PhotoGrid, LoadingContainer } from '../styled/styled';

export default function Gallery({ posts }) {
  let location = useLocation();
  return (
    <div style={{ padding: '0 24px' }}>
      {posts.length ? (
        <PhotoGrid>
          {posts.map(
            (image, index) =>
              image.media_type === 'image' && (
                <ImageLink
                  duration={Math.random() * 1.5 + 0.6}
                  delay={Math.random() * 1.5}
                  key={index}
                  to={`/img/${index}`}
                  url={image.url}
                  state={{ backgroundLocation: location }}
                >
                  <div>
                    <p>{image.date}</p>
                    <p>{image.title}</p>
                  </div>
                  <Heart />
                </ImageLink>
              )
          )}
        </PhotoGrid>
      ) : (
        <LoadingContainer>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
          />
          <h1>LOADING . . .</h1>
        </LoadingContainer>
      )}
      <Outlet />
    </div>
  );
}
