import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Outlet } from 'react-router-dom';

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  justify-content: center;
  gap: 20px;
  grid-auto-rows: 305px;
  ${({ cascade }) =>
    cascade &&
    css`
      grid-auto-rows: 200px;
      grid-gap: 5px;
    `}
  @media (max-width: 990px) {
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc(33vw - 10px);
  }
`;

const ImageLink = styled(Link)`
  background: no-repeat center/150% url(/img/${({ index }) => index}.jpeg);
  :hover {
    opacity: 0.7;
  }
  ${({ cascade }) =>
    cascade &&
    css`
      background-size: cover;
      &:nth-of-type(2n) {
        grid-row-start: span 2;
      }
    `}
`;

export function Gallery({ match, location, posts }) {
  // console.log(location);
  // const cascade = location.search === '?type=cascade';
  return (
    <div>
      <PhotoGrid>
        {posts.map(
          (image, index) =>
            image.media_type === 'image' && (
              <ImageLink
                key={index}
                index={index}
                to={{
                  pathname: `/img/${index}`,
                  // this is the trick!
                  state: { modal: true },
                }}
              ></ImageLink>
            )
        )}
      </PhotoGrid>
      <Outlet />
    </div>
  );
}
