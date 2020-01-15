import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemStyled } from './BreadcrumbStyled';

import { Span } from '../../style/text';

export const Breadcrumb = ({ breadcrumb, currentLabel, obj }) => {
    return (
        <BreadcrumbStyled mb={{ d: 4, lg: 0 }}>
            {breadcrumb ? (
                <>
                    {breadcrumb.map((item) => {
                        return (
                            <BreadcrumbItemStyled display="inline-block" fontSize={{ d: 14, lg: 16 }} key={item.path}>
                                <LinkTo obj={obj} link={item.path} text="Voltar" />
                                <Span mx={{ d: 1, lg: 2 }}> &gt; </Span>
                            </BreadcrumbItemStyled>
                        );
                    })}

                    {currentLabel && (
                        <BreadcrumbItemStyled display={{ d: 'block', lg: 'inline-block' }} fontSize={{ d: 24, lg: 16 }} fontWeight="700">
                            {currentLabel}
                        </BreadcrumbItemStyled>
                    )}
                </>
            ) : currentLabel ? (
                <BreadcrumbItemStyled display={{ d: 'block', lg: 'inline-block' }} fontSize={{ d: 24, lg: 16 }} fontWeight="700">
                    {currentLabel}
                </BreadcrumbItemStyled>
            ) : (
                <BreadcrumbItemStyled fontSize={{ d: 14, lg: 16 }}>Minha Conta</BreadcrumbItemStyled>
            )}
        </BreadcrumbStyled>
    );
};
