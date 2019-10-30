import React, { useContext } from 'react';

import { Context } from '../../store/context';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialStyled } from './SocialStyled';

export const Social = ({ ...props }) => {
    // CONTEXT
    const { stateSocialGlobal } = useContext(Context);

    return stateSocialGlobal ? (
        <SocialStyled {...props}>
            <li>
                <LinkToExternal text="Facebook" link={stateSocialGlobal.facebook} target="_blank">
                    <Svg name="svg-facebook" />
                </LinkToExternal>
            </li>

            {/* <li>
                <LinkToExternal text="Twitter" link={stateSocialGlobal.twitter} target="_blank">
                    <Svg name="svg-twitter" />
                </LinkToExternal>
            </li> */}

            <li>
                <LinkToExternal text="You Tube" link={stateSocialGlobal.youtube} target="_blank">
                    <Svg name="svg-youtube" />
                </LinkToExternal>
            </li>

            <li>
                <LinkToExternal text="Instagram" link={stateSocialGlobal.instagram} target="_blank">
                    <Svg name="svg-instagram" />
                </LinkToExternal>
            </li>

            {/* <li>
                <LinkToExternal text="Linkedin" link={stateSocialGlobal.linkedin} target="_blank">
                    <Svg name="svg-linkedin" />
                </LinkToExternal>
            </li> */}
        </SocialStyled>
    ) : null;
};
