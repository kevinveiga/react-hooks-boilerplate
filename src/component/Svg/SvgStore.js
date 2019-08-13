import React from 'react';

import { SvgArrowStyled } from './SvgArrowStyled';
import { SvgShareStyled } from './SvgShareStyled';

export const SvgArrowLeft = ({ ...props }) => {
    return (
        <SvgArrowStyled {...props} version={1} viewBox="0 0 257.6 451.8" xmlns="http://www.w3.org/2000/svg">
            <path d="M226 0a31.5 31.5 0 0 1 22.3 54l-172 172 172 171.8a31.6 31.6 0 0 1-44.7 44.8L9.3 248.3a31.5 31.5 0 0 1 0-44.7L203.5 9.3A31.5 31.5 0 0 1 226 0z" />
        </SvgArrowStyled>
    );
};

export const SvgArrowRight = ({ ...props }) => {
    return (
        <SvgArrowStyled {...props} version={1} viewBox="0 0 257.6 451.8" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.6 0A31.5 31.5 0 0 0 9.3 54l171.9 172-172 171.8A31.6 31.6 0 0 0 54 442.6l194.3-194.3a31.5 31.5 0 0 0 0-44.7L54 9.3A31.5 31.5 0 0 0 31.6 0z" />
        </SvgArrowStyled>
    );
};

export const SvgFacebook = ({ ...props }) => {
    return (
        <SvgShareStyled {...props} version={1} viewBox="0 0 50 96.2" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8 0c-13 0-22 8-22 22.6v12.6H0v17.1h14.8v44h17.6v-44h17v-17h-17v-11c0-5 1.4-8.3 8.5-8.3h9V0z" />
        </SvgShareStyled>
    );
};

export const SvgInstagram = ({ ...props }) => {
    return (
        <SvgShareStyled {...props} version={1} viewBox="0 0 510.9 511.9" xmlns="http://www.w3.org/2000/svg">
            <path d="M255.5 0C186 0 177.3.3 150 1.5a187 187 0 0 0-62 11.9A124.9 124.9 0 0 0 42.5 43a126 126 0 0 0-29.4 45.3 187.5 187.5 0 0 0-12 62.1A1747 1747 0 0 0-.4 256c0 69.5.4 78.2 1.5 105.5a187 187 0 0 0 12 62.1A126.2 126.2 0 0 0 42.5 469 126 126 0 0 0 88 498.5a187.6 187.6 0 0 0 62 11.9c27.3 1.2 36 1.5 105.6 1.5 69.5 0 78.2-.3 105.5-1.5a187 187 0 0 0 62-11.9 131 131 0 0 0 75-74.9 187.7 187.7 0 0 0 11.9-62.1c1.2-27.3 1.5-36 1.5-105.5s-.2-78.2-1.4-105.5a187 187 0 0 0-11.8-62.1A125 125 0 0 0 468.6 43a126 126 0 0 0-45.4-29.5 187.5 187.5 0 0 0-62-11.9A1747 1747 0 0 0 255.5 0zm.2 46.5c68.5 0 76.5.3 103.5 1.5 25 1.1 38.5 5.3 47.5 8.8A78.7 78.7 0 0 1 436 75.9c8.5 8.3 15 18.3 19.2 29.4 3.5 9 7.6 22.6 8.8 47.5 1.2 27 1.5 35.1 1.5 103.4 0 68.3-.3 76.3-1.5 103.3-1.2 25-5.3 38.5-8.8 47.5a85 85 0 0 1-48.6 48.6c-9 3.5-22.6 7.7-47.6 8.8-27 1.2-35 1.5-103.3 1.5-68.4 0-76.5-.3-103.5-1.5-25-1.1-38.5-5.3-47.5-8.8a78.8 78.8 0 0 1-29.4-19.1 79.6 79.6 0 0 1-19-29.4c-3.6-9-7.7-22.6-8.8-47.5-1.3-27-1.5-35.1-1.5-103.4 0-68.3.2-76.5 1.5-103.4 1-25 5.2-38.5 8.7-47.5a77.8 77.8 0 0 1 19.3-29.4c8.2-8.5 18.2-15 29.4-19.1 9-3.5 22.6-7.7 47.4-8.8 27-1.2 35.2-1.5 103.4-1.5zm136.5 42.1a30.7 30.7 0 1 0 0 61.4 30.7 30.7 0 0 0 0-61.4zm-136.7 35.9a131.5 131.5 0 1 0 .1 263 131.5 131.5 0 0 0 0-263zm0 46.2a85.3 85.3 0 1 1 0 170.6 85.3 85.3 0 0 1 0-170.6z" />
        </SvgShareStyled>
    );
};

export const SvgLinkedin = ({ ...props }) => {
    return (
        <SvgShareStyled {...props} version={1} viewBox="0 0 430.1 411" xmlns="http://www.w3.org/2000/svg">
            <path d="M52.2 0C20.6 0 0 20.7 0 47.9c0 26.6 20 48 51 48h.6c32.1 0 52.1-21.4 52.1-48C103.1 20.7 83.7 0 52.2 0zM324 127.2c-49 0-70.9 27-83.1 45.8v.9h-.6l.6-1v-39.2h-92.3c1.3 26 0 277.3 0 277.3H241V256.1a63 63 0 0 1 3-22.4c6.7-16.6 21.9-33.8 47.3-33.8 33.4 0 46.7 25.5 46.7 62.7V411h92.2V252c0-85.2-45.5-124.8-106.1-124.8zM5.5 133.7V411h92.2V133.7H5.5z" />
        </SvgShareStyled>
    );
};

export const SvgSearch = ({ ...props }) => {
    return (
        <svg {...props} version={1} viewBox="0 0 17.5 17.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3 0a6.5 6.5 0 0 0 .2 13 6.3 6.3 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5h-.8l-.3-.3A6.3 6.3 0 0 0 13 6.5 6.5 6.5 0 0 0 6.3 0zm0 2A4.5 4.5 0 0 1 11 6.5 4.5 4.5 0 0 1 6.5 11a4.5 4.5 0 0 1-.2-9z" />
        </svg>
    );
};
