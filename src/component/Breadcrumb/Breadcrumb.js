import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemStyled } from './BreadcrumbStyled';

export const Breadcrumb = ({ breadcrumb, currentLabel, obj }) => {
    return (
        <BreadcrumbStyled>
            {breadcrumb ? (
                <>
                    {breadcrumb.map((item) => {
                        return (
                            <BreadcrumbItemStyled key={item.path}>
                                <LinkTo obj={obj} link={item.path} text={item.label} />
                                <span> &gt; </span>
                            </BreadcrumbItemStyled>
                        );
                    })}

                    <BreadcrumbItemStyled>{currentLabel}</BreadcrumbItemStyled>
                </>
            ) : (
                <BreadcrumbItemStyled>Minha Conta</BreadcrumbItemStyled>
            )}
        </BreadcrumbStyled>
    );
};
