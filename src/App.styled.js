import styled, { keyframes } from 'styled-components';
import ErrorImage from './components/img/ErrorImage.jpg';

export const NotFound = styled.div`
   margin: 0 auto;

   background-image: url(${ErrorImage});
   background-size: cover;

   @media screen and (min-width: 320px) {
      width: 220px;
      height: 200px;
   }
   @media screen and (min-width: 768px) {
      width: 420px;
      height: 378px;
   }
   @media screen and (min-width: 1024px) {
      width: 620px;
      height: 578px;
   }
`;

export const Box = styled.div`
   display: flex;
   flex-direction: column;
`;
export const Gallery = styled.div`
   display: grid;
   grid-template-columns: 1fr;
   grid-gap: 16px;
   padding-bottom: 24px;
`;
export const Searchbar = styled.header`
   top: 0;
   left: 0;
   position: sticky;
   z-index: 1100;
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 64px;
   padding-right: 24px;
   padding-left: 24px;
   padding-top: 12px;
   padding-bottom: 12px;
   color: #fff;
   background-color: #3f51b5;
   box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const ImageGallery = styled.ul`
   display: grid;
   max-width: calc(100vw - 48px);
   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
   grid-gap: 16px;
   margin-top: 0;
   margin-bottom: 0;
   padding: 0;
   list-style: none;
   margin-left: auto;
   margin-right: auto;
`;

const ldsDualRing = keyframes`
 0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
	
`;

export const Loader = styled.div`
   display: inline-block;
   margin: 40px auto;
   width: 40px;
   height: 40px;
   &::after {
      content: ' ';

      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 6px solid #3f51b5;
      border-color: #3f51b5 transparent #3f51b5 transparent;
      animation: ${ldsDualRing} 1.2s linear infinite;
   }
`;

export const Button = styled.button`
   margin: 0 auto;
   padding: 8px 16px;
   border-radius: 2px;
   background-color: #3f51b5;
   transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
   text-align: center;
   display: inline-block;
   color: #fff;
   border: 0;
   text-decoration: none;
   cursor: pointer;
   font-family: inherit;
   font-size: 18px;
   line-height: 24px;
   font-style: normal;
   font-weight: 500;
   min-width: 180px;
   box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
   &:hover,
   &:focus {
      background-color: #303f9f;
   }
`;
