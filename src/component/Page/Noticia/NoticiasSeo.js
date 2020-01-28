import React from 'react';

import { apiUrlNoticias } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { Seo } from '../../Seo/Seo';

export const NoticiasSeo = () => {
    // API
    const stateSeo = useSeoApi(`${apiUrlNoticias}/seo`);

    return (
        <Seo>
            <title>{stateSeo.data && stateSeo.data.title}</title>
            <meta name="description" content={stateSeo.data && stateSeo.data.description} />
        </Seo>
    );
};
