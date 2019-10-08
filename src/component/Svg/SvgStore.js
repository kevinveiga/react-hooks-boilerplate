import React from 'react';

import { SvgArrowStyled } from './SvgArrowStyled';
import { SvgCloseStyled } from './SvgCloseStyled';
import { SvgLogoLoaderStyled } from './SvgLogoLoaderStyled';
import { SvgMenuStyled } from './SvgMenuStyled';
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
            <mask id="logo-loader-part-mask-content" mask-type="luminance" maskContentUnits="userSpaceOnUse" maskUnits="userSpaceOnUse">
                <path d="M46.5 0C26.1.2 5.5 11 0 36.8h17.9A30.5 30.5 0 0 1 46.6 16a33.8 33.8 0 0 1 12.1 2.5c4.3 1.8 8.3 2 12.5-2.2l5.4-6.6a48.7 48.7 0 0 0-30-9.8z" id="logo-loader-part-1">
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
            </mask>

            <path d="M0 0h93.2v55H0z" fill="rgba(0, 0, 0, 1)" id="logo-loader-part-mask-container" mask="url(#logo-loader-part-mask-content)" />

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

export const SvgSearch = ({ ...props }) => {
    return (
        <SvgStyled {...props} version={1} viewBox="0 0 17.5 17.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3 0a6.5 6.5 0 0 0 .2 13 6.3 6.3 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5h-.8l-.3-.3A6.3 6.3 0 0 0 13 6.5 6.5 6.5 0 0 0 6.3 0zm0 2A4.5 4.5 0 0 1 11 6.5 4.5 4.5 0 0 1 6.5 11a4.5 4.5 0 0 1-.2-9z" />
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

export const SvgView = ({ ...props }) => {
    return (
        <SvgViewStyled {...props} version={1} viewBox="0 0 512 326.33" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C116.8 0 7.82 146.95 3.25 153.2a16.9 16.9 0 000 19.92c4.57 6.26 113.56 153.2 252.75 153.2s248.17-146.94 252.75-153.2c4.33-5.93 4.33-13.98 0-19.91C504.17 146.95 395.19 0 256 0zm0 33.76c102.52 0 191.32 97.51 217.61 129.42-26.25 31.9-114.86 129.39-217.61 129.39-102.53 0-191.33-97.53-217.62-129.42C64.63 131.24 153.25 33.75 256 33.75zm0 28.13c-55.84 0-101.28 45.43-101.28 101.27 0 55.85 45.44 101.28 101.28 101.28S357.27 219 357.27 163.16c0-55.84-45.43-101.27-101.27-101.27zm0 33.76a67.6 67.6 0 0167.51 67.51A67.6 67.6 0 01256 230.68a67.59 67.59 0 01-67.52-67.52A67.6 67.6 0 01256 95.65z" />
        </SvgViewStyled>
    );
};
