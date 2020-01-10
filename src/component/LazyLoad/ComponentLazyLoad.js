import React, { Suspense } from 'react';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { LoaderPlaceholder } from '../Loader/LoaderPlaceholder';

export const ComponentLazyLoad = ({ component: Component, placeholder = <LoaderPlaceholder />, ...otherProps }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={placeholder}>
                <Component {...otherProps} />
            </Suspense>
        </ErrorBoundary>
    );
};
