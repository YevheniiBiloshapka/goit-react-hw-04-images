import styled from 'styled-components';
export const Form = styled.form`
   display: flex;
   align-items: center;
   width: 100%;
   max-width: 600px;
   background-color: #fff;
   border-radius: 3px;
   overflow: hidden;
`;
export const FormButton = styled.button`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 48px;
   height: 48px;
   border: 0;

   opacity: 0.6;
   transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
   cursor: pointer;
   outline: none;
   &:hover {
      opacity: 1;
   }
   & svg {
      width: 18px;
      height: 18px;
   }
`;

export const Input = styled.input`
   display: inline-block;
   width: 100%;
   font: inherit;
   font-size: 18px;
   border: none;
   outline: none;
   padding-left: 4px;
   padding-right: 4px;
`;
