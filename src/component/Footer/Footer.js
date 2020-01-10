import React, { lazy, useEffect, useState } from 'react';

import { matchPath, withRouter } from 'react-router-dom';

import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';

// LAZY
const FooterAlternative = lazy(() => import('./FooterAlternative'));
const FooterPrincipal = lazy(() => import('./FooterPrincipal'));

export const Footer = withRouter(({ ...props }) => {
    const [stateAlternative, setStateAlternative] = useState(false);

    useEffect(() => {
        const alternative = matchPath(props.location.pathname, {
            path: ['/cadastro', '/esqueci-minha-senha', '/login', '/minha-conta']
        });

        setStateAlternative(alternative);

        return undefined;
    }, [props.location.pathname]);

    return stateAlternative ? <ComponentLazyLoad component={FooterAlternative} /> : <ComponentLazyLoad component={FooterPrincipal} />;
});
