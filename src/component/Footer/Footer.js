import React, { useEffect, useState } from 'react';

import { matchPath, withRouter } from 'react-router-dom';

import { FooterAlternative } from './FooterAlternative';
import { FooterPrincipal } from './FooterPrincipal';

export const Footer = withRouter(({ ...props }) => {
    const [stateAlternative, setStateAlternative] = useState(false);

    useEffect(() => {
        const alternative = matchPath(props.location.pathname, {
            path: ['/cadastro', '/esqueci-minha-senha', '/login', '/minha-conta']
        });

        setStateAlternative(alternative);

        return undefined;
    }, [props.location.pathname]);

    return stateAlternative ? <FooterAlternative /> : <FooterPrincipal />;
});
