import React, { Suspense } from 'react';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { LoaderPlaceholder } from '../Loader/LoaderPlaceholder';

export const ComponentLazyLoad = ({ component: Component, placeholder = <LoaderPlaceholder />, ...props }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={placeholder}>
                <Component {...props} />
            </Suspense>
        </ErrorBoundary>
    );
};
