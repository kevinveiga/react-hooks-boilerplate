import React, { useContext } from 'react';

import { Context } from '../../store/context';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialStyled } from './SocialStyled';

export const Social = ({ ...props }) => {
    const stateSocialGlobal = useContext(Context);

    let socialRender = '';

    if (stateSocialGlobal) {
        socialRender = (
            <SocialStyled {...props}>
                <li>
                    <LinkToExternal text="Facebook" href={stateSocialGlobal.facebook} target="_blank">
                        <Svg name="svg-facebook" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Twitter" href={stateSocialGlobal.twitter} target="_blank">
                        <Svg name="svg-twitter" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="You Tube" href={stateSocialGlobal.youtube} target="_blank">
                        <Svg name="svg-youtube" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Instagram" href={stateSocialGlobal.instagram} target="_blank">
                        <Svg name="svg-instagram" />
                    </LinkToExternal>
                </li>

                <li>
                    <LinkToExternal text="Linkedin" href={stateSocialGlobal.linkedin} target="_blank">
                        <Svg name="svg-linkedin" />
                    </LinkToExternal>
                </li>
            </SocialStyled>
        );
    }

    return socialRender;
};
