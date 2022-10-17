import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
   componentDidMount() {
      window.addEventListener(`keydown`, this.handleKeyDown);
   }
   componentWillUnmount() {
      window.removeEventListener(`keydown`, this.handleKeyDown);
   }

   handleKeyDown = e => {
      if (e.code === 'Escape') {
         this.props.onClose();
      }
   };
   handleBackDropClick = e => {
      if (e.currentTarget === e.target) {
         this.props.onClose();
      }
   };

   render() {
      const { tags, largeImageURL } = this.props.hits;
      return createPortal(
         <Overlay onClick={this.handleBackDropClick}>
            <ModalImg>
               <img src={largeImageURL} alt={tags} />
            </ModalImg>
         </Overlay>,
         modalRoot
      );
   }
}

export default Modal;

Modal.propTypes = {
   largeImageURL: PropTypes.string.isRequired,
   tags: PropTypes.string.isRequired,
   activeImageIdx: PropTypes.func.isRequired,
   toggleModal: PropTypes.func.isRequired,
}.isRequired;
