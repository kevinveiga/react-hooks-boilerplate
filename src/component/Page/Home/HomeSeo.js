import React from 'react';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { Seo } from '../../Seo/Seo';

export const HomeSeo = () => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`);

    return (
        <Seo>
            <title>{stateSeo.data && stateSeo.data.title}</title>
            <meta name="description" content={stateSeo.data && stateSeo.data.description} />
        </Seo>
    );
};
