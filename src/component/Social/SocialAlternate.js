import React from 'react';

import { apiUrlConfiguracoes } from '../../config';

import { useSocialApi } from '../../service/social';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialAlternateStyled } from './SocialAlternateStyled';

export const SocialAlternate = ({ ...props }) => {
    // API
    const stateSocial = useSocialApi(`${apiUrlConfiguracoes}/social`);

    return stateSocial.data ? (
        <SocialAlternateStyled {...props}>
            <li>
                <LinkToExternal text="Facebook" link={stateSocial.data.facebook} target="_blank">
                    <Svg name="svg-facebook-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Twitter" link={stateSocial.data.twitter} target="_blank">
                    <Svg name="svg-twitter-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="You Tube" link={stateSocial.data.youtube} target="_blank">
                    <Svg name="svg-youtube-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Instagram" link={stateSocial.data.instagram} target="_blank">
                    <Svg name="svg-instagram-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Linkedin" link={stateSocial.data.linkedin} target="_blank">
                    <Svg name="svg-linkedin-circle" />
                </LinkToExternal>
            </li>
        </SocialAlternateStyled>
    ) : null;
};
