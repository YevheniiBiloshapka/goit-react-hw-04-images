import PropTypes from 'prop-types';
import { Item, ItemImage, ItemList } from './ImageGallery.styled';

function ImageGallery({ hits, setSelectedImage, onClick }) {
   return (
      <>
         <ItemList>
            {hits.map(({ id, tags, webformatURL, largeImageURL }) => (
               <Item key={id}>
                  <ItemImage
                     src={webformatURL}
                     alt={tags}
                     onClick={() => {
                        onClick();
                        setSelectedImage({
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

export default ImageGallery;

ImageGallery.propTypes = {
   setSelectedImage: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired,
   largeImageURL: PropTypes.string.isRequired,
   webformatURL: PropTypes.string.isRequired,
   tags: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
}.isRequired;
