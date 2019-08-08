import React from 'react';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialAlternateStyled } from './SocialAlternateStyled';

export const Share = ({ title, url, ...props }) => {
    return (
        <SocialAlternateStyled {...props}>
            <li>
                <LinkToExternal text="Facebook" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" target="_blank">
                    <Svg name="svg-facebook-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Twitter" href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank">
                    <Svg name="svg-twitter-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Linkedin" href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`} target="_blank">
                    <Svg name="svg-linkedin-circle" />
                </LinkToExternal>
            </li>
        </SocialAlternateStyled>
    );
};