import React, { useContext } from 'react';

import { Context } from '../../store/context';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialAlternateStyled } from './SocialAlternateStyled';

export const SocialAlternate = ({ ...props }) => {
    // CONTEXT
    const { stateSocialGlobal } = useContext(Context);

    return (
        stateSocialGlobal && (
            <SocialAlternateStyled {...props}>
                <li>
                    <LinkToExternal text="Facebook" href={stateSocialGlobal.facebook} target="_blank">
                        <Svg name="svg-facebook-circle" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Twitter" href={stateSocialGlobal.twitter} target="_blank">
                        <Svg name="svg-twitter-circle" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="You Tube" href={stateSocialGlobal.youtube} target="_blank">
                        <Svg name="svg-youtube-circle" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Instagram" href={stateSocialGlobal.instagram} target="_blank">
                        <Svg name="svg-instagram-circle" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Linkedin" href={stateSocialGlobal.linkedin} target="_blank">
                        <Svg name="svg-linkedin-circle" />
                    </LinkToExternal>
                </li>
            </SocialAlternateStyled>
        )
    );
};
