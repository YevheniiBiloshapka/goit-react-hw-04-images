import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
   Box,
   Gallery,
   Searchbar,
   Button,
   Loader,
   NotFound,
} from './App.styled';
import { SearchForm, ImageGallery, Modal, imageAPI } from './components';

const per_page = 12;

export function App() {
   const [hits, setHits] = useState([]);
   const [totalHits, setTotalHits] = useState(null);
   const [searchInput, setSearchInput] = useState('');
   const [page, setPage] = useState(1);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState(`idle`);
   const [showModal, setShowModal] = useState(false);
   const [selectedImage, setSelectedImage] = useState(null);

   useEffect(() => {
      if (searchInput.trim() === '') {
         return;
      }
      setStatus('pending');
      imageAPI
         .fetchImages(searchInput, page, per_page)
         .then(res => {
            setHits(prevHits => [...prevHits, ...res.hits]);
            setTotalHits(res.totalHits);
            setStatus('resolved');
         })
         .catch(error => {
            toast.error(`${error.message}`);
            setStatus('rejected');
            setError(error.message);
         });
   }, [searchInput, page]);

   const handleSubmit = searchInput => {
      setSearchInput(searchInput);
      setHits([]);
      setPage(1);
   };

   const loadMore = () => {
      setPage(prevPage => prevPage + 1);
   };

   const toggleModal = () => {
      setShowModal(!showModal);
      setSelectedImage(null);
   };

   return (
      <Box>
         <Gallery>
            <Searchbar>
               <SearchForm onSubmit={handleSubmit} />
            </Searchbar>
            <ImageGallery
               hits={hits}
               setSelectedImage={setSelectedImage}
               onClick={toggleModal}
            />
         </Gallery>

         {totalHits === 0 && <NotFound />}
         {error && <NotFound />}
         {status === 'pending' && <Loader />}
         {totalHits - (page - 1) * per_page > per_page && (
            <Button onClick={loadMore}>Load More</Button>
         )}
         {showModal && <Modal hits={selectedImage} onClose={toggleModal} />}
         <ToastContainer limit={1} />
      </Box>
   );
}
