import React from 'react';

import { Helmet } from 'react-helmet-async';

import { useSeoApi } from '../../service/seo';

export const Seo = ({ url }) => {
    // API
    const stateSeo = useSeoApi(url);

    return (
        <Helmet>
            <title>{stateSeo.data && stateSeo.data.title}</title>
            <meta name="description" content={stateSeo.data && stateSeo.data.description} />
        </Helmet>
    );
};
