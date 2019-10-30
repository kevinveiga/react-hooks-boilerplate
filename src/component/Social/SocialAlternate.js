import React, { useContext } from 'react';

import { Context } from '../../store/context';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialAlternateStyled } from './SocialAlternateStyled';

export const SocialAlternate = ({ ...props }) => {
    // CONTEXT
    const { stateSocialGlobal } = useContext(Context);

    return stateSocialGlobal ? (
        <SocialAlternateStyled {...props}>
            <li>
                <LinkToExternal text="Facebook" link={stateSocialGlobal.facebook} target="_blank">
                    <Svg name="svg-facebook-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Twitter" link={stateSocialGlobal.twitter} target="_blank">
                    <Svg name="svg-twitter-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="You Tube" link={stateSocialGlobal.youtube} target="_blank">
                    <Svg name="svg-youtube-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Instagram" link={stateSocialGlobal.instagram} target="_blank">
                    <Svg name="svg-instagram-circle" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Linkedin" link={stateSocialGlobal.linkedin} target="_blank">
                    <Svg name="svg-linkedin-circle" />
                </LinkToExternal>
            </li>
        </SocialAlternateStyled>
    ) : null;
};
