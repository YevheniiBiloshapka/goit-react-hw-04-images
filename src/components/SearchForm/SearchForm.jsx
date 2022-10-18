import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, FormButton, Input } from './SearchForm.styled';
import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';

function SearchForm({ onSubmit }) {
   const [name, setName] = useState('');

   const handleNameChange = event => {
      setName(event.currentTarget.value.toLowerCase());
   };

   const handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;

      if (name.trim() === '') {
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

      onSubmit(name);
      form.reset();
      setName('');
   };

   return (
      <Form onSubmit={handleSubmit}>
         <FormButton type="submit">
            <VscSearch />
         </FormButton>

         <Input
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            value={name}
            placeholder="Search images and photos"
            onChange={handleNameChange}
         />
      </Form>
   );
}

export default SearchForm;

SearchForm.propTypes = {
   onSubmit: PropTypes.func.isRequired,
}.isRequired;
