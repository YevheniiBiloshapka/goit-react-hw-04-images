import PropTypes from 'prop-types';
import { Item, ItemImage, ItemList } from './ImageGallery.styled';
import { Component } from 'react';

class ImageGallery extends Component {
   render() {
      const { hits } = this.props;

      return (
         <>
            <ItemList>
               {hits.map(({ id, tags, webformatURL, largeImageURL }) => (
                  <Item key={id}>
                     <ItemImage
                        src={webformatURL}
                        alt={tags}
                        onClick={() => {
                           this.props.onClick();
                           this.props.setActiveImageIdx({
                              tags,
                              largeImageURL,
                           });
                        }}
                     />
                  </Item>
               ))}
            </ItemList>
         </>
      );
   }
}

export default ImageGallery;

ImageGallery.propTypes = {
   setActiveImageIdx: PropTypes.func.isRequired,
   toggleModal: PropTypes.func.isRequired,
   largeImageURL: PropTypes.string.isRequired,
   webformatURL: PropTypes.string.isRequired,
   tags: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
}.isRequired;
