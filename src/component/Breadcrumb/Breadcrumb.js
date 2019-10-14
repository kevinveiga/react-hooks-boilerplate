import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemsStyled } from './BreadcrumbStyled';

export const Breadcrumb = ({ currentLabel, obj, ...props }) => {
    console.log('props2: ', props);

    return (
        props && (
            <BreadcrumbStyled>
                {props.breadcrumb.map((item) => {
                    return (
                        <BreadcrumbItemsStyled key={item.path}>
                            <LinkTo obj={obj} link={item.path} text={item.label} />
                            <span> &gt; </span>
                        </BreadcrumbItemsStyled>
                    );
                })}

                <BreadcrumbItemsStyled>{currentLabel}</BreadcrumbItemsStyled>
            </BreadcrumbStyled>
        )
    );
};
