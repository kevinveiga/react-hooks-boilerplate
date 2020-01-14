import React from 'react';

import { SvgArrowStyled } from './SvgArrowStyled';
import { SvgCloseStyled } from './SvgCloseStyled';
import { SvgLogoLoaderStyled } from './SvgLogoLoaderStyled';
import { SvgMenuStyled } from './SvgMenuStyled';
import { SvgPlaceholderLoaderStyled } from './SvgPlaceholderLoaderStyled';
import { SvgSocialStyled } from './SvgSocialStyled';
import { SvgStyled } from './SvgStyled';
import { SvgValidationStyled } from './SvgValidationStyled';
import { SvgViewStyled } from './SvgViewStyled';

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

export const SvgCamera = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 420.8 331.2" xmlns="http://www.w3.org/2000/svg">
            <path d="M150.4 0C140 0 130.8 4 124 10.8a36.6 36.6 0 00-10.8 26v.8h-66c-13.2 0-24.8 5.2-33.2 14C5.6 60 0 72 0 84.8V284c0 13.2 5.2 24.8 14 33.2 8.4 8.4 20.4 14 33.2 14h326.4c13.2 0 24.8-5.2 33.2-14 8.4-8.4 14-20.4 14-33.2V84.8c0-13.2-5.2-24.8-14-33.2-8.4-8.8-20-14-33.2-14h-66.4v-.8c0-10-4-19.6-10.8-26a36.6 36.6 0 00-26-10.8zm.4 20.8h119.6c4.4 0 8.4 1.6 11.2 4.4 2.8 2.8 4.4 6.8 4.4 11.2V48c0 6 4.8 10.8 10.8 10.8H374c7.2 0 13.6 2.8 18.4 7.6 4.8 4.8 7.6 11.2 7.6 18.4V284h-.4c0 7.2-2.8 13.6-7.6 18.4-4.8 4.8-11.2 7.6-18.4 7.6H47.2c-7.2 0-13.6-2.8-18.4-7.6-4.8-4.8-7.6-11.2-7.6-18.4V84.8c0-7.2 2.8-13.6 7.6-18.4 4.8-4.8 11.2-7.6 18.4-7.6h77.2c6 0 10.8-4.8 10.8-10.8V36.4c0-4.4 1.6-8.4 4.4-11.2 2.8-2.8 6.8-4.4 11.2-4.4zM210.4 86c-27.2 0-52 11.2-69.6 28.8-18 18-28.8 42.4-28.8 69.6 0 27.2 11.2 52 28.8 69.6 18 18 42.4 28.8 69.6 28.8 27.2 0 52-11.2 69.6-28.8 18-18 28.8-42.4 28.8-69.6 0-27.2-11.2-52-28.8-69.6A98.57 98.57 0 00210.4 86zm0 22c21.2 0 40.4 8.8 54.4 22.4 14 14 22.4 33.2 22.4 54.4.4 21.2-8.4 40.4-22.4 54.4-14 13.6-33.2 22.4-54.4 22.4-21.2 0-40.4-8.8-54.4-22.4-14-14-22.4-33.2-22.4-54.4 0-21.2 8.8-40.4 22.4-54.4 14-14 33.2-22.4 54.4-22.4z" />
        </SvgStyled>
    );
};

export const SvgChecked = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 23.8 16.9" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2.5a1 1 0 0 0-.6.3l-13.1 13-6.2-6.1A1 1 0 0 0 .8 9.2l7 6.9a1 1 0 0 0 .7.3 1 1 0 0 0 .7-.3L23.1 2.2a1 1 0 0 0-.9-1.7z" />
        </SvgStyled>
    );
};

export const SvgClose = ({ ...props }) => {
    return (
        <SvgCloseStyled {...props} version={1} viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.2.5a.7.7 0 0 0-.5 1.3l6.8 6.7-6.8 6.7a.7.7 0 0 0 .5 1.3.7.7 0 0 0 .5-.3l6.8-6.7 6.7 6.7a.7.7 0 0 0 .5.3.7.7 0 0 0 .5-1.3L9.5 8.5l6.7-6.7a.7.7 0 1 0-1-1L8.5 7.4 1.7.7a.7.7 0 0 0-.5-.2z" />
        </SvgCloseStyled>
    );
};

export const SvgFacebook = ({ ...props }) => {
    return (
        <SvgSocialStyled {...props} version={1} viewBox="0 0 50 96.2" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8 0c-13 0-22 8-22 22.6v12.6H0v17.1h14.8v44h17.6v-44h17v-17h-17v-11c0-5 1.4-8.3 8.5-8.3h9V0z" />
        </SvgSocialStyled>
    );
};

export const SvgInstagram = ({ ...props }) => {
    return (
        <SvgSocialStyled {...props} version={1} viewBox="0 0 510.9 511.9" xmlns="http://www.w3.org/2000/svg">
            <path d="M255.5 0C186 0 177.3.3 150 1.5a187 187 0 0 0-62 11.9A124.9 124.9 0 0 0 42.5 43a126 126 0 0 0-29.4 45.3 187.5 187.5 0 0 0-12 62.1A1747 1747 0 0 0-.4 256c0 69.5.4 78.2 1.5 105.5a187 187 0 0 0 12 62.1A126.2 126.2 0 0 0 42.5 469 126 126 0 0 0 88 498.5a187.6 187.6 0 0 0 62 11.9c27.3 1.2 36 1.5 105.6 1.5 69.5 0 78.2-.3 105.5-1.5a187 187 0 0 0 62-11.9 131 131 0 0 0 75-74.9 187.7 187.7 0 0 0 11.9-62.1c1.2-27.3 1.5-36 1.5-105.5s-.2-78.2-1.4-105.5a187 187 0 0 0-11.8-62.1A125 125 0 0 0 468.6 43a126 126 0 0 0-45.4-29.5 187.5 187.5 0 0 0-62-11.9A1747 1747 0 0 0 255.5 0zm.2 46.5c68.5 0 76.5.3 103.5 1.5 25 1.1 38.5 5.3 47.5 8.8A78.7 78.7 0 0 1 436 75.9c8.5 8.3 15 18.3 19.2 29.4 3.5 9 7.6 22.6 8.8 47.5 1.2 27 1.5 35.1 1.5 103.4 0 68.3-.3 76.3-1.5 103.3-1.2 25-5.3 38.5-8.8 47.5a85 85 0 0 1-48.6 48.6c-9 3.5-22.6 7.7-47.6 8.8-27 1.2-35 1.5-103.3 1.5-68.4 0-76.5-.3-103.5-1.5-25-1.1-38.5-5.3-47.5-8.8a78.8 78.8 0 0 1-29.4-19.1 79.6 79.6 0 0 1-19-29.4c-3.6-9-7.7-22.6-8.8-47.5-1.3-27-1.5-35.1-1.5-103.4 0-68.3.2-76.5 1.5-103.4 1-25 5.2-38.5 8.7-47.5a77.8 77.8 0 0 1 19.3-29.4c8.2-8.5 18.2-15 29.4-19.1 9-3.5 22.6-7.7 47.4-8.8 27-1.2 35.2-1.5 103.4-1.5zm136.5 42.1a30.7 30.7 0 1 0 0 61.4 30.7 30.7 0 0 0 0-61.4zm-136.7 35.9a131.5 131.5 0 1 0 .1 263 131.5 131.5 0 0 0 0-263zm0 46.2a85.3 85.3 0 1 1 0 170.6 85.3 85.3 0 0 1 0-170.6z" />
        </SvgSocialStyled>
    );
};

export const SvgInvalid = ({ ...props }) => {
    return (
        <SvgValidationStyled {...props} version={1} viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.2.5a.7.7 0 0 0-.5 1.3l6.8 6.7-6.8 6.7a.7.7 0 0 0 .5 1.3.7.7 0 0 0 .5-.3l6.8-6.7 6.7 6.7a.7.7 0 0 0 .5.3.7.7 0 0 0 .5-1.3L9.5 8.5l6.7-6.7a.7.7 0 1 0-1-1L8.5 7.4 1.7.7a.7.7 0 0 0-.5-.2z" />
        </SvgValidationStyled>
    );
};

export const SvgLinkedin = ({ ...props }) => {
    return (
        <SvgSocialStyled {...props} version={1} viewBox="0 0 430.1 411" xmlns="http://www.w3.org/2000/svg">
            <path d="M52.2 0C20.6 0 0 20.7 0 47.9c0 26.6 20 48 51 48h.6c32.1 0 52.1-21.4 52.1-48C103.1 20.7 83.7 0 52.2 0zM324 127.2c-49 0-70.9 27-83.1 45.8v.9h-.6l.6-1v-39.2h-92.3c1.3 26 0 277.3 0 277.3H241V256.1a63 63 0 0 1 3-22.4c6.7-16.6 21.9-33.8 47.3-33.8 33.4 0 46.7 25.5 46.7 62.7V411h92.2V252c0-85.2-45.5-124.8-106.1-124.8zM5.5 133.7V411h92.2V133.7H5.5z" />
        </SvgSocialStyled>
    );
};

export const SvgLogoLoader = ({ ...props }) => {
    return (
        <SvgLogoLoaderStyled {...props} version={1} viewBox="0 0 93.2 124" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="cp-logo-loader-1">
                <path d="M0 0h93.2v55H0z" />
            </clipPath>

            <g clipPath="url('#cp-logo-loader-1')">
                <path
                    d="M46.51 2C26.1 2.2 5.57 12.91 0 38.78h17.88c5.7-15.6 19.53-20.88 28.72-20.7a33.8 33.8 0 0112.12 2.53c4.27 1.77 8.32 2.02 12.52-2.19l5.36-6.65C67.88 4.92 57.22 2.08 46.51 2z"
                    id="logo-loader-part-1"
                >
                    <animate attributeName="opacity" attributeType="CSS" begin="250ms" dur="1650ms" id="opacity-1" keyTimes="0; 0.3; 0.5; 0.7; 1" repeatCount="indefinite" values="1; 1; 0; 1; 1" />
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        begin="250ms"
                        calcMode="spline"
                        dur="1650ms"
                        from="0 45 45"
                        keySplines="1 0 0 1; 1 0 0 1; 1 0 0 1; 1 0 0 1; 1 0 0 1; 1 0 0 1; 1 0 0 1"
                        keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1"
                        repeatCount="indefinite"
                        type="rotate"
                        to="360 45 45"
                    />
                </path>
            </g>

            <path id="logo-loader-part-2">
                <animate
                    attributeName="d"
                    attributeType="XML"
                    dur="1650ms"
                    repeatCount="indefinite"
                    values="M 17.876953,59.009766 0,59.011719 v 47.099611 c 0.00113194,9.8727 8.0042539,17.87582 17.876953,17.87695 z; M 17.876953,79.009766 0,79.011719 v 27.099611 c 0.00113194,9.8727 8.0042539,17.87582 17.876953,17.87695 z; M 17.876953,59.009766 0,59.011719 v 47.099611 c 0.00113194,9.8727 8.0042539,17.87582 17.876953,17.87695 z"
                />
            </path>

            <path id="logo-loader-part-3">
                <animate attributeName="d" attributeType="XML" begin="250ms" dur="1650ms" repeatCount="indefinite" values="M38 75.3V124h18V75.3z; M38 95.3V124h18V95.3z; M38 75.3V124h18V75.3z" />
            </path>

            <path id="logo-loader-part-4">
                <animate
                    attributeName="d"
                    attributeType="XML"
                    begin="650ms"
                    dur="1650ms"
                    repeatCount="indefinite"
                    values="m 75.320312,59.007812 v 64.978518 c 9.8727,-10e-4 17.875822,-8.00425 17.876954,-17.87695 V 59.009766 Z; m 75.320312,79.007812 v 44.978518 c 9.8727,-10e-4 17.875822,-8.00425 17.876954,-17.87695 V 79.009766 Z; m 75.320312,59.007812 v 64.978518 c 9.8727,-10e-4 17.875822,-8.00425 17.876954,-17.87695 V 59.009766 Z"
                />
            </path>
        </SvgLogoLoaderStyled>
    );
};

export const SvgMenu = ({ ...props }) => {
    return (
        <SvgMenuStyled {...props} version={1} viewBox="0 0 459 306" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0v51h459V0zm0 127.5v51h459v-51zM0 255v51h459v-51z" />
        </SvgMenuStyled>
    );
};

export const SvgNoView = ({ ...props }) => {
    return (
        <SvgViewStyled {...props} version={1} viewBox="0 0 512 326.33" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C116.8 0 7.82 146.95 3.25 153.2a16.9 16.9 0 000 19.92c1.91 2.62 22.16 29.94 55.27 60.8L0 264.1v62.22l105.19-54.26c41.79 29.57 93.76 54.26 150.8 54.26 139.2 0 248.18-146.95 252.76-153.2 4.33-5.94 4.33-14 0-19.92-1.92-2.63-22.17-29.94-55.28-60.8L512 62.22V0L406.8 54.26C365.01 24.69 313.05 0 256 0zm0 33.76c42.25 0 82.17 16.57 116.35 38.28l-42.49 21.91A101 101 0 00256 61.9c-55.84 0-101.28 45.43-101.28 101.27 0 6.88.7 13.6 2.01 20.1l-65.92 34a488.39 488.39 0 01-52.43-54.1C64.63 131.23 153.25 33.75 256 33.75zm0 61.89a67.18 67.18 0 0142.02 14.73l-109.43 56.45A67.6 67.6 0 01256 95.65zm165.2 13.41a488.2 488.2 0 0152.41 54.12C447.36 195.08 358.75 292.57 256 292.57c-42.26 0-82.17-16.57-116.35-38.28l42.49-21.91A101 101 0 00256 264.44c55.84 0 101.27-45.43 101.27-101.28 0-6.87-.69-13.6-2-20.09zM323.4 159.5A67.6 67.6 0 01256 230.68a67.17 67.17 0 01-42.02-14.73z" />
        </SvgViewStyled>
    );
};

export const SvgPlaceholderLoader = ({ ...props }) => {
    return (
        <SvgPlaceholderLoaderStyled {...props} version={1} viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="cp-placeholder-loader-1">
                <circle cx="100" cy="100" r="10" />

                <circle cx="150" cy="100" r="10" />

                <circle cx="200" cy="100" r="10" />
            </clipPath>

            <linearGradient id="lg-placeholder-loader-1">
                <stop offset="0%" stopColor="rgba(216, 221, 225, 1)" stopOpacity="1">
                    <animate attributeName="offset" keyTimes="0; 1" dur="2s" repeatCount="indefinite" values="-2; 1" />
                </stop>

                <stop offset="50%" stopColor="rgba(103, 111, 115, 1)" stopOpacity="1">
                    <animate attributeName="offset" keyTimes="0; 1" dur="2s" repeatCount="indefinite" values="-1; 2" />
                </stop>

                <stop offset="100%" stopColor="rgba(216, 221, 225, 1)" stopOpacity="1">
                    <animate attributeName="offset" keyTimes="0; 1" dur="2s" repeatCount="indefinite" values="0; 3" />
                </stop>
            </linearGradient>

            <g clipPath="url('#cp-placeholder-loader-1')">
                <rect x="0" y="0" width="300" height="200" style={{ fill: 'url("#lg-placeholder-loader-1")' }} />
            </g>
        </SvgPlaceholderLoaderStyled>
    );
};

export const SvgSearch = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 17.5 17.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3 0a6.5 6.5 0 0 0 .2 13 6.3 6.3 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5h-.8l-.3-.3A6.3 6.3 0 0 0 13 6.5 6.5 6.5 0 0 0 6.3 0zm0 2A4.5 4.5 0 0 1 11 6.5 4.5 4.5 0 0 1 6.5 11a4.5 4.5 0 0 1-.2-9z" />
        </SvgStyled>
    );
};

export const SvgTipoAudio = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 455.2 457.6" xmlns="http://www.w3.org/2000/svg">
            <path d="M227.6 0C165.2 0 112.5 24.3 68.4 68.4A232.14 232.14 0 000 233.6v110.6c0 62.5 50.9 113.4 113.4 113.4 7.5 0 13.5-6 13.5-13.5V244.4c0-7.5-6-13.5-13.5-13.5-34.6 0-65.6 15.5-86.4 40v-37.3C27 119.7 113.7 27 227.6 27c113.9 0 200.6 92.7 200.6 206.6 0 .9.1 1.8.3 2.7-.2.9-.3 1.8-.3 2.7v37.3c-20.8-24.5-51.8-40-86.4-40-7.5 0-13.5 6-13.5 13.5v193.7c0 7.5 6 13.5 13.5 13.5 62.5 0 113.4-44.9 113.4-107.4V239c0-.9-.1-1.8-.3-2.7.2-.9.3-1.8.3-2.7 0-62.4-24.3-121.1-68.4-165.2C342.7 24.3 290 0 227.6 0zM99.8 258.9v170.6c-41.2-6.5-72.9-42.3-72.9-85.3.1-43 31.7-78.8 72.9-85.3zm255.6 5.4c41.2 6.5 72.9 42.3 72.9 85.3-.1 43.1-31.7 72.8-72.9 79.3z" />
        </SvgStyled>
    );
};

export const SvgTipoDownload = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 498.34 437.69" xmlns="http://www.w3.org/2000/svg">
            <path d="M257 0l-3.05.01C200.91.05 150.68 34.38 128.97 82.4c-4.99 9.91-8.01 21.38-11.14 31.46-47.21.4-91.12 32.76-108.31 76.26-19.33 46.5-8.73 104.12 27.37 139.6 23.93 24.22 58.57 37.36 92.5 34.88 13-.46 26.36 1.48 39.15-1.09 11.27-4.51 11.57-23.34-.22-27.44-9.2-3.21-18.97-.1-28.43-1.19-21.25.66-43.63.14-62.48-11.13-36.96-20.3-56-66.32-46.08-106.94 8.11-36.55 39.67-67.86 77.12-72.31 8.6-1.56 17.33.1 25.82-.83 8.8-2.57 11.2-12.62 11.57-20.64 8.54-45.69 46.61-85.14 93.22-91.95C280 24.43 322.9 43.8 346.09 77.95c16.58 23.64 23.63 52.56 21.36 81.09 1.04 9.42 11.75 14.8 20.37 12.18 35.81-2.15 69.63 24.67 78.44 58.97 10.43 35.85-6.15 78.7-40.07 96.01-16.62 9.1-35.97 9.27-54.38 8.7-11.05.35-22.49-1.38-33.31 1.12-11.21 4.56-11.48 23.3.28 27.4 9.21 3.26 19.12.04 28.62 1.27 22.96.54 47.11.77 68.1-10.01 41.22-19.34 66.6-65.98 62.39-111.06-3.2-43.95-34.12-85.43-76.9-97.89a101.95 101.95 0 00-24.41-4.27c-1.45-57.92-39.77-114-94.9-133.37A135.51 135.51 0 00257 .01zm21 61.42c-.42-.02-.83-.02-1.25 0-43.64-.71-84.85 32.59-93.5 75.34-2.82 8-1.7 18.83 6.72 22.9 9.19 4.87 21.95-2.45 21.7-13.02 4.65-30.86 33.76-56.07 65.13-55.32 9.4.08 17.43-9.6 14.4-18.77-1.62-5.92-7-10.85-13.2-11.13zM252.64 251.5c-10.17-.33-16.9 10.83-14.81 20.1V392c-8.58-6.93-15.59-16.56-25.84-21.09-10.89-3.22-22.53 9.22-17.59 19.78 4 8.98 13.76 13.1 20.08 20.18 10.3 8.38 18.91 19.33 30.8 25.55 10.77 4.09 22.17-2.25 28.96-10.53 11.94-11.28 25.46-21.1 36.23-33.5 6.03-10.24-4.64-24.87-16.3-21.49-9.65 2.61-14.88 12.11-22.77 17.54-1.3.84-4.95 6.02-3.73 1.85-.31-42.52.62-85.1-.47-127.6a15.04 15.04 0 00-14.56-11.18z" />
        </SvgStyled>
    );
};

export const SvgTipoImagem = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 422.77 374.77" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.87 0C5.42 0 0 3.75 0 9.19v355.07c0 5.44 5.42 10.51 10.87 10.51h403.07c5.44 0 8.83-5.07 8.83-10.5V9.18c0-5.44-3.39-9.19-8.83-9.19zm8.82 19.7h383.39v244.1l-61.94-54.64a9.53 9.53 0 00-13.18.45l-71.93 72.06L145.2 160.12a10.45 10.45 0 00-14.15.26L19.7 291.26zm246.56 88.56a49.29 49.29 0 00-49.23 49.23 49.29 49.29 0 0049.23 49.23 49.29 49.29 0 0049.23-49.23 49.29 49.29 0 00-49.23-49.23zm0 19.7a29.57 29.57 0 0129.54 29.53 29.57 29.57 0 01-29.54 29.54 29.57 29.57 0 01-29.54-29.54 29.57 29.57 0 0129.54-29.54zM138.3 181l111.15 121.54a10 10 0 0013.79-.25l71.81-72.26 68.03 59.92v65.12H19.69V319.1z" />
        </SvgStyled>
    );
};

export const SvgTipoPost = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 374.01 361" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.73 0A9.87 9.87 0 00-1 10.02v340.86A9.87 9.87 0 008.63 361h267.85a10.07 10.07 0 007.2-3.12l86.66-90.04a9.94 9.94 0 002.66-6.97V10.12A9.87 9.87 0 00363.37 0h-.1zM19 20h334v231h-76.52c-5.52 0-10.48 4.34-10.48 9.87V341H19zm51.32 41a10 10 0 100 20h132.82a10 10 0 000-20zm0 64a10 10 0 100 20h225.2a10 10 0 100-20zm0 62a10 10 0 100 20h225.2a10 10 0 100-20zM286 271h53.74L286 326.1z" />
        </SvgStyled>
    );
};

export const SvgTipoVideo = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 612 535.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M363.38 0C289.44 0 229.5 59.94 229.5 133.88c0 37.5 15.51 71.31 40.37 95.62h-70.15c18.32-20.33 29.78-46.97 29.78-76.5 0-63.38-51.37-114.75-114.75-114.75S0 89.62 0 153c0 34.58 15.63 65.22 39.82 86.25C16.2 252.28 0 277.12 0 306v153a76.5 76.5 0 0076.5 76.5h306A76.5 76.5 0 00459 459v-19.13l114.75 95.63A38.24 38.24 0 00612 497.25v-229.5a38.24 38.24 0 00-38.25-38.25L459 306c0-23.22-10.56-43.76-26.9-57.8 38.89-23.42 65.15-65.63 65.15-114.32C497.25 59.94 437.31 0 363.37 0zm0 38.04c52.91 0 95.83 42.9 95.83 95.84a95.82 95.82 0 01-95.83 95.83c-52.94 0-95.84-42.92-95.84-95.84 0-52.93 42.92-95.83 95.83-95.83zM114.75 76.5a76.5 76.5 0 110 153 76.5 76.5 0 010-153zM76.5 267.75h306A38.24 38.24 0 01420.75 306v153a38.25 38.25 0 01-38.25 38.25h-306A38.24 38.24 0 0138.25 459V306a38.24 38.24 0 0138.25-38.25zm497.25 0v229.5L459 401.62v-57.37z" />
        </SvgStyled>
    );
};

export const SvgValid = ({ ...props }) => {
    return (
        <SvgValidationStyled {...props} version={1} viewBox="0 0 23.8 16.9" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2.5a1 1 0 0 0-.6.3l-13.1 13-6.2-6.1A1 1 0 0 0 .8 9.2l7 6.9a1 1 0 0 0 .7.3 1 1 0 0 0 .7-.3L23.1 2.2a1 1 0 0 0-.9-1.7z" />
        </SvgValidationStyled>
    );
};

export const SvgVideoCamera = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 612 535.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M363.38 0C289.44 0 229.5 59.94 229.5 133.88c0 37.5 15.51 71.31 40.37 95.62h-70.15c18.32-20.33 29.78-46.97 29.78-76.5 0-63.38-51.37-114.75-114.75-114.75S0 89.62 0 153c0 34.58 15.63 65.22 39.82 86.25C16.2 252.28 0 277.12 0 306v153a76.5 76.5 0 0076.5 76.5h306A76.5 76.5 0 00459 459v-19.13l114.75 95.63A38.24 38.24 0 00612 497.25v-229.5a38.24 38.24 0 00-38.25-38.25L459 306c0-23.22-10.56-43.76-26.9-57.8 38.89-23.42 65.15-65.63 65.15-114.32C497.25 59.94 437.31 0 363.37 0zm0 38.04c52.91 0 95.83 42.9 95.83 95.84a95.82 95.82 0 01-95.83 95.83c-52.94 0-95.84-42.92-95.84-95.84 0-52.93 42.92-95.83 95.83-95.83zM114.75 76.5a76.5 76.5 0 110 153 76.5 76.5 0 010-153zM76.5 267.75h306A38.24 38.24 0 01420.75 306v153a38.25 38.25 0 01-38.25 38.25h-306A38.24 38.24 0 0138.25 459V306a38.24 38.24 0 0138.25-38.25zm497.25 0v229.5L459 401.62v-57.37z" />
        </SvgStyled>
    );
};

export const SvgView = ({ ...props }) => {
    return (
        <SvgViewStyled {...props} version={1} viewBox="0 0 512 326.33" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C116.8 0 7.82 146.95 3.25 153.2a16.9 16.9 0 000 19.92c4.57 6.26 113.56 153.2 252.75 153.2s248.17-146.94 252.75-153.2c4.33-5.93 4.33-13.98 0-19.91C504.17 146.95 395.19 0 256 0zm0 33.76c102.52 0 191.32 97.51 217.61 129.42-26.25 31.9-114.86 129.39-217.61 129.39-102.53 0-191.33-97.53-217.62-129.42C64.63 131.24 153.25 33.75 256 33.75zm0 28.13c-55.84 0-101.28 45.43-101.28 101.27 0 55.85 45.44 101.28 101.28 101.28S357.27 219 357.27 163.16c0-55.84-45.43-101.27-101.27-101.27zm0 33.76a67.6 67.6 0 0167.51 67.51A67.6 67.6 0 01256 230.68a67.59 67.59 0 01-67.52-67.52A67.6 67.6 0 01256 95.65z" />
        </SvgViewStyled>
    );
};
