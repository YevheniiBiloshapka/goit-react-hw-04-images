import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ hits, onClose }) {
   const { tags, largeImageURL } = hits;
   window.addEventListener(`keydown`, handleKeyDown);

   function handleKeyDown(e) {
      if (e.code === 'Escape') {
         onClose();
         return window.removeEventListener(`keydown`, handleKeyDown);
      }
   }

   function handleBackDropClick(e) {
      if (e.currentTarget === e.target) {
         onClose();
      }
   }

   return createPortal(
      <Overlay onClick={handleBackDropClick}>
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
