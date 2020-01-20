import React from 'react';

import { Helmet } from 'react-helmet-async';

export const Seo = ({ children }) => {
    return <Helmet>{children}</Helmet>;
};
