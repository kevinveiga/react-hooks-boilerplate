import React from 'react';

import { LeadwallForm } from '../Form/LeadwallForm';
import { Svg } from '../Svg/Svg';

import { LeadwallStyled, Termos } from './LeadwallStyled';

import { Title3, Title5 } from '../../style/text';

export const Leadwall = ({ ...props }) => {
    return (
        <>
            <LeadwallStyled px={{ d: 3, sm: '15%' }} pb={{ d: 3, sm: 4 }} pt={{ d: 4, sm: 5 }} {...props}>
                <Svg className="svg-lock" name="svg-lock" mb={4} />

                <Title3 fontWeight="600">Continue lendo: é grátis.</Title3>

                <Title5 mb={{ d: 4, sm: 5 }}>Deixe seu melhor e-mail para desbloquear o conteúdo.</Title5>

                <LeadwallForm obj={{ colorLine: 'colorGray4', colorPlaceholder: 'colorGray2', themeForm: 'leadwall' }} />
            </LeadwallStyled>

            <Termos mb="75px" px={{ d: 3, sm: '15%' }} py={{ d: 2, sm: 3 }} {...props}>
                Ao desbloquear o conteúdo, você concorda com os termos de uso, políticas.
            </Termos>
        </>
    );
};
