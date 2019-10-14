import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemsStyled } from './BreadcrumbStyled';

export const Breadcrumb = ({ actualLabel, obj, ...props }) => {
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

                <BreadcrumbItemsStyled>{actualLabel}</BreadcrumbItemsStyled>
            </BreadcrumbStyled>
        )
    );
};
