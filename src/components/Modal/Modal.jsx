import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

function Modal({ hits, onClose }) {
   const { tags, largeImageURL } = hits;

   const handleKeyDown = e => {
      if (e.currentTarget === e.target || e.code === 'Escape') {
         onClose();
      }
   };

   useEffect(() => {
      window.addEventListener(`keydown`, handleKeyDown);
      return () => {
         return window.removeEventListener(`keydown`, handleKeyDown);
      };
   });

   return createPortal(
      <Overlay onClick={onClose}>
         <ModalImg>
            <img src={largeImageURL} alt={tags} />
         </ModalImg>
      </Overlay>,
      modalRoot
   );
}

export default Modal;

Modal.propTypes = {
   largeImageURL: PropTypes.string.isRequired,
   tags: PropTypes.string.isRequired,
   toggleModal: PropTypes.func.isRequired,
}.isRequired;
