import { Component } from 'react';
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

export class App extends Component {
   state = {
      searchInput: '',
      hits: [],
      totalHits: null,
      page: 1,
      per_page: 12,
      error: null,
      status: `idle`,
      showModal: false,
      activeImageIdx: null,
   };

   componentDidUpdate(_, prevState) {
      const { page, searchInput } = this.state;
      const prevName = prevState.searchInput;
      const prevPage = prevState.page;

      if (prevName !== searchInput || prevPage !== page) {
         this.setState({ status: 'pending' });

         imageAPI
            .fetchImages(searchInput, page, this.state.per_page)
            .then(res => {
               const { hits, totalHits } = res;
               this.setState(prevState => ({
                  hits:
                     prevName !== searchInput
                        ? [...hits]
                        : [...prevState.hits, ...hits],
                  totalHits,
                  status: 'resolved',
               }));
            })
            .catch(error => {
               toast.error(`${error.message}`);
               this.setState({ error, status: 'rejected' });
            });
      }
   }

   handleSubmit = searchInput => {
      this.setState({ searchInput });
   };

   toggleModal = () => {
      this.setState(({ showModal }) => ({
         showModal: !showModal,
         activeImageIdx: null,
      }));
   };

   setActiveImageIdx = ({ tags, largeImageURL }) => {
      this.setState({
         activeImageIdx: { tags, largeImageURL },
      });
   };

   onLoadMore = () => {
      this.setState(prevState => ({ page: prevState.page + 1 }));
   };

   render() {
      const {
         hits,
         showModal,
         activeImageIdx,
         status,
         totalHits,
         page,
         per_page,
      } = this.state;
      const { handleSubmit, toggleModal, setActiveImageIdx } = this;

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
               <Button onClick={this.onLoadMore}>Load More</Button>
            )}
            {showModal && <Modal hits={activeImageIdx} onClose={toggleModal} />}
            <ToastContainer limit={1} />
         </Box>
      );
   }
}
