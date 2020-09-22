import React, { createContext, useContext, useMemo, useState } from 'react';

const BreadcrumbContext = createContext(undefined);

export const BreadcrumbProvider = ({ children }) => {
    const [stateBreadcrumb, setStateBreadcrumb] = useState(false);

    const memoBreadcrumb = useMemo(() => [stateBreadcrumb, setStateBreadcrumb], [stateBreadcrumb, setStateBreadcrumb]);

    return (
        <BreadcrumbContext.Provider
            value={{
                stateBreadcrumbContext: memoBreadcrumb[0],
                setStateBreadcrumbContext: memoBreadcrumb[1]
            }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);

    if (context === undefined) {
        throw new Error('useBreadcrumb can only be used inside BreadcrumbProvider');
    }

    return context;
};
