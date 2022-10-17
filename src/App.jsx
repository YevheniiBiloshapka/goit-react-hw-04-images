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
   const [activeImageIdx, setActiveImageIdx] = useState(null);

   useEffect(() => {
      if (searchInput === '') {
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
            setError(error);
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
      setActiveImageIdx(null);
   };

   return (
      <Box>
         <Gallery>
            <Searchbar>
               <SearchForm onSubmit={handleSubmit} />
            </Searchbar>
            <ImageGallery
               hits={hits}
               setActiveImageIdx={setActiveImageIdx}
               onClick={toggleModal}
            />
         </Gallery>

         {totalHits === 0 && <NotFound />}
         {status === 'pending' && <Loader />}
         {totalHits - (page - 1) * per_page > per_page && (
            <Button onClick={loadMore}>Load More</Button>
         )}
         {showModal && <Modal hits={activeImageIdx} onClose={toggleModal} />}
         <ToastContainer limit={1} />
      </Box>
   );
}
