import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Image = styled.div`
  width: 300px;
  height: 300px;
  @media (max-width: 990px) {
    width: 100%;
  }
  background: no-repeat center/150% url(${({ url }) => url});
  ${({ inModal }) =>
    !inModal &&
    css`
      :hover {
        filter: saturate(150%);
      }
    `}
`;

export const ImageLink = styled(Link).attrs((props) => ({
  style: {
    animationDuration: `${props.duration}s`,
    animationTimingFunction: 'ease',
    animationDelay: `${props.delay}s`,
    animationIterationCount: 1,
    animationName: 'zoomOnLoad',
    animationFillMode: 'forwards',
  },
}))`
  opacity: 0;
  background-size: cover;
  background: no-repeat center/150% url(${({ url }) => url});
  transition: opacity 0.5s;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  div {
    padding: 5px;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    @media (max-width: 300px) {
      display: none;
    }
  }
  p {
    color: white;
    margin: 3px;
  }
  ${({ inModal }) =>
    !inModal &&
    css`
      :hover {
        filter: saturate(200%);
      }
    `}
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  justify-content: center;
  gap: 15px;
  grid-auto-rows: 305px;
  @media (max-width: 990px) {
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc(33vw - 10px);
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-auto-rows: calc(100vw - 10px);
  }
`;

export const ModalStyled = styled.div`
  display: grid;
  justify-content: center;
  @media (max-width: 990px) {
    left: 0;
    right: 0;
    width: auto;
  }
  @media (max-width: 550px) {
    div {
      padding: 0;
    }
    p {
      font-size: 0.8em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      max-height: 8rem;
    }
    h1 {
      font-size: 1.3em;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HeartIcon = styled.div`
  fill: transparent;
  stroke: #ff2581;
  stroke-width: 50;
  cursor: pointer;
  position: relative;
`;

export const HeartSVG = styled.svg`
  overflow: visible;
  width: 20px;
  position: absolute;
  top: 20px;
  right: 50px;
`;

export const HeartPath = styled.path`
  animation-play-state: paused
  stroke-dashoffset: 0;
  stroke-dasharray: 1550;
  transform-origin: center;
`;
