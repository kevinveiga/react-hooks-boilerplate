import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbListStyled, BreadcrumbItemStyled } from './BreadcrumbStyled';

import { Span } from '../../style/text';

export const Breadcrumb = ({ breadcrumb, currentLabel, obj }) => {
    return (
        <BreadcrumbListStyled mb={{ d: 4, lg: 0 }}>
            {breadcrumb ? (
                <>
                    {breadcrumb.map((item) => {
                        return (
                            <BreadcrumbItemStyled display="inline-block" fontSize={{ d: '14px', lg: '16px' }} key={item.path}>
                                <LinkTo link={item.path} obj={obj} text="Voltar" />
                                <Span mx={{ d: 1, lg: 2 }}> &gt; </Span>
                            </BreadcrumbItemStyled>
                        );
                    })}

                    {currentLabel && (
                        <BreadcrumbItemStyled display={{ d: 'block', lg: 'inline-block' }} fontSize={{ d: '24px', lg: '16px' }} fontWeight="700">
                            {currentLabel}
                        </BreadcrumbItemStyled>
                    )}
                </>
            ) : currentLabel ? (
                <BreadcrumbItemStyled display={{ d: 'block', lg: 'inline-block' }} fontSize={{ d: '24px', lg: '16px' }} fontWeight="700">
                    {currentLabel}
                </BreadcrumbItemStyled>
            ) : (
                <BreadcrumbItemStyled fontSize={{ d: '14px', lg: '16px' }}>Minha Conta</BreadcrumbItemStyled>
            )}
        </BreadcrumbListStyled>
    );
};
