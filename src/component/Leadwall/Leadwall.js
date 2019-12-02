import React, { lazy, Suspense } from 'react';

import { LoaderComponent } from '../Loader/LoaderComponent';
import { Svg } from '../Svg/Svg';

import { LeadwallStyled, LeadwallTermosStyled } from './LeadwallStyled';

import { P, Title3, Title5 } from '../../style/text';

// LAZY
const LeadwallForm = lazy(() => import('../Form/LeadwallForm'));

export const Leadwall = ({ ...props }) => {
    return (
        <>
            <LeadwallStyled px={{ d: 3, sm: '15%' }} pb={{ d: 3, sm: 4 }} pt={{ d: 4, sm: 5 }} {...props}>
                <Svg name="svg-lock" mb={4} />

                <Title3 fontWeight="700" themeColor="light">
                    Continue lendo: é grátis.
                </Title3>

                <Title5 mb={{ d: 4, sm: 5 }} themeColor="light">
                    Deixe seu melhor e-mail para desbloquear o conteúdo.
                </Title5>

                <Suspense fallback={LoaderComponent()}>
                    <LeadwallForm obj={{ colorLine: 'colorGray4', colorPlaceholder: 'colorGray2', themeForm: 'leadwall' }} />
                </Suspense>
            </LeadwallStyled>

            <LeadwallTermosStyled mb="75px" px={{ d: 3, sm: '15%' }} py={{ d: 2, sm: 3 }} {...props}>
                Ao desbloquear o conteúdo, você concorda com os termos de uso, políticas.
            </LeadwallTermosStyled>
        </>
    );
};
