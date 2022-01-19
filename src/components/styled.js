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
        opacity: 0.7;
      }
    `}
`;

export const ImageLink = styled(Link)`
  background-size: cover;
  background: no-repeat center/150% url(${({ url }) => url});
  ${({ inModal }) =>
    !inModal &&
    css`
      :hover {
        opacity: 0.7;
      }
    `}
`;

export const PhotoGrid = styled.div`
display: grid; 
grid-template-columns: repeat(3, 305px); 
justify-content: center; 
gap: 10px; 
grid-auto-rows: 305px; 
@media (max-width: 990px) {
  gap: 5px; 
  grid-template-columns: repeat(3, 1fr); 
  grid-auto-rows: calc(33vw - 10px);
  `;

export const ModalStyled = styled.div`
  display: grid;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
