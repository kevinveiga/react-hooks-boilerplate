import React from 'react';

import { apiUrlConfiguracoes } from '../../config';

import { useSocialApi } from '../../service/social';

import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import { SocialSidebarStyled, SocialSidebarItemStyled } from './SocialSidebarStyled';

export const SocialSidebar = ({ ...props }) => {
    // API
    const stateSocial = useSocialApi(`${apiUrlConfiguracoes}/social`);

    return stateSocial.data ? (
        <SocialSidebarStyled
            bottom={{ d: '10px', sm: '20px' }}
            px={{ d: '10px', sm: '0px' }}
            py={{ d: '0px', sm: '10px' }}
            right={{ d: '10px', sm: '20px' }}
            {...props}
        >
            <SocialSidebarItemStyled>
                <LinkToExternal text="Youtube" link={stateSocial.data.youtube} target="_blank">
                    <Svg name="svg-youtube-colored" height="20px" />
                </LinkToExternal>
            </SocialSidebarItemStyled>

            <SocialSidebarItemStyled>
                <LinkToExternal text="Instagram" link={stateSocial.data.instagram} target="_blank">
                    <Svg name="svg-instagram-colored" height="25px" />
                </LinkToExternal>
            </SocialSidebarItemStyled>

            <SocialSidebarItemStyled>
                <LinkToExternal text="Linkedin" link={stateSocial.data.linkedin} target="_blank">
                    <Svg name="svg-linkedin-colored" height="25px" />
                </LinkToExternal>
            </SocialSidebarItemStyled>
        </SocialSidebarStyled>
    ) : null;
};
