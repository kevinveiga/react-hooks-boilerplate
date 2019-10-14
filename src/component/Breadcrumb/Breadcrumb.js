import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemsStyled } from './BreadcrumbStyled';

export const Breadcrumb = ({ breadcrumb, currentLabel, obj }) => {
    return (
        <BreadcrumbStyled>
            {breadcrumb ? (
                <>
                    {breadcrumb.map((item) => {
                        return (
                            <BreadcrumbItemsStyled key={item.path}>
                                <LinkTo obj={obj} link={item.path} text={item.label} />
                                <span> &gt; </span>
                            </BreadcrumbItemsStyled>
                        );
                    })}

                    <BreadcrumbItemsStyled>{currentLabel}</BreadcrumbItemsStyled>
                </>
            ) : (
                <BreadcrumbItemsStyled>Minha Conta</BreadcrumbItemsStyled>
            )}
        </BreadcrumbStyled>
    );
};
