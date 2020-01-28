import React from 'react';

import parse from 'html-react-parser';

import { apiUrlConfiguracoes } from '../../config';

import { useBannerApi } from '../../service/banner';

import { useChangeBannerScroll, useFadeOutBannerScroll } from '../../store/banner/banner';

import { BannerRightStyled } from './BannerStyled';

export const BannerRight = ({ elementChange, elementFadeOut, ...otherProps }) => {
    // API
    const stateBanner = useBannerApi(`${apiUrlConfiguracoes}/sidebar`);

    // ACTION
    const stateChangeBannerScroll = useChangeBannerScroll(elementChange.elementId, elementChange.offset);
    const stateFadeOutBannerScroll = useFadeOutBannerScroll(elementFadeOut.elementId, elementFadeOut.offset);

    return stateBanner.data.sidebar_habilitada === '1' ? (
        <BannerRightStyled change={stateChangeBannerScroll} fadeOut={stateFadeOutBannerScroll} {...otherProps}>
            {parse(`${stateBanner.data.sidebar}`)}
        </BannerRightStyled>
    ) : null;
};
