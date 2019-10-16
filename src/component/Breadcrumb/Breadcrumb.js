import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { BreadcrumbStyled, BreadcrumbItemStyled } from './BreadcrumbStyled';

import { Span } from '../../style/text';

export const Breadcrumb = ({ breadcrumb, currentLabel, obj }) => {
    return (
        <BreadcrumbStyled mb={{ d: 4, md: 0 }}>
            {breadcrumb ? (
                <>
                    {breadcrumb.map((item) => {
                        return (
                            <BreadcrumbItemStyled display="inline-block" fontSize={{ d: 14, md: 18 }} key={item.path}>
                                <LinkTo obj={obj} link={item.path} text={item.label} />
                                <Span mx={{ d: 1, md: 2 }}> &gt; </Span>
                            </BreadcrumbItemStyled>
                        );
                    })}

                    {currentLabel && (
                        <BreadcrumbItemStyled display={{ d: 'block', md: 'inline-block' }} fontSize={{ d: 24, md: 18 }} fontWeight="600">
                            {currentLabel}
                        </BreadcrumbItemStyled>
                    )}
                </>
            ) : (
                <BreadcrumbItemStyled>Minha Conta</BreadcrumbItemStyled>
            )}
        </BreadcrumbStyled>
    );
};
