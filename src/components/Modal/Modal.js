import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { Dialog } from '@reach/dialog';
import { ImageView } from '../ImageView/ImageView';
import { ModalStyled } from '../styled';
import { PostGrid, InfoGrid } from '../PostGrid/PostGrid';

export function Modal({ posts }) {
  let navigate = useNavigate();
  let { id } = useParams();
  let image = posts[id];
  let buttonRef = useRef();

  function onDismiss() {
    navigate(-1);
  }
  if (!image) return null;

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
    >
      <ModalStyled>
        <PostGrid>
          <ImageView inModal image={image} />
          <InfoGrid>
            <h1>{image.title}</h1>
            <p>{image.explanation}</p>
          </InfoGrid>
          <button
            style={{ display: 'block' }}
            ref={buttonRef}
            onClick={onDismiss}
          >
            Close
          </button>
        </PostGrid>
      </ModalStyled>
    </Dialog>
  );
}
