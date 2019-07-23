import parse from 'html-react-parser';

import { apiUrlConfiguracoes } from '../../config';

import { useBannerApi } from '../../service/banner';

export const BannerPerfilInvestidor = () => {
    const [stateBanner] = useBannerApi(`${apiUrlConfiguracoes}/sidebar`, {});

    return stateBanner.data.sidebar_habilitada === '1' && parse(`${stateBanner.data.sidebar}`);
};
