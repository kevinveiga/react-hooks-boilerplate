import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemsStyled } from './BreadcrumbStyled';

export const Breadcrumb = ({ obj, label, Breadcrumb }) => {
    console.log('props2: ', Breadcrumb);

    return (
        <BreadcrumbStyled>
            {Breadcrumb.map((breadcrumb) => {
                return (
                    <BreadcrumbItemsStyled key={breadcrumb.path}>
                        <LinkTo obj={obj} link={breadcrumb.path} text={breadcrumb.label} />
                        <span> &gt; </span>
                    </BreadcrumbItemsStyled>
                );
            })}

            <BreadcrumbItemsStyled>{label}</BreadcrumbItemsStyled>
        </BreadcrumbStyled>
    );
};
