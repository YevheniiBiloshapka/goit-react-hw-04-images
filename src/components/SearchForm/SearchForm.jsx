import PropTypes from 'prop-types';
import { Component } from 'react';
import { Form, FormButton, Input } from './SearchForm.styled';
import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';

class SearchForm extends Component {
   state = {
      name: '',
      isCooldown: true,
   };

   handleNameChange = event => {
      this.setState({
         name: event.currentTarget.value.toLowerCase(),
      });
   };

   handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (this.state.name.trim() === '') {
         toast.info('Please enter name', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
         });
      }
      this.props.onSubmit(this.state.name);
      form.reset();
      this.setState({ name: '' });
   };

   render() {
      return (
         <Form onSubmit={this.handleSubmit}>
            <FormButton type="submit">
               <VscSearch />
            </FormButton>

            <Input
               name="name"
               type="text"
               autoComplete="off"
               autoFocus
               value={this.state.name}
               placeholder="Search images and photos"
               onChange={this.handleNameChange}
            />
         </Form>
      );
   }
}

export default SearchForm;

SearchForm.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
}.isRequired;
