import styled from 'styled-components';

import { variable } from '../../style/variable';

export const StatusStreamingBadgeStyled = styled.span`
    background-color: ${variable.colorWhite};
    border: 1px solid ${({ type }) => (type === 'Ao vivo' ? variable.colorRed : variable.colorGreen)};
    border-radius: 4px;
    color: ${({ type }) => (type === 'Ao vivo' ? variable.colorRed : variable.colorGreen)};
    font-size: 12px;
    font-weight: 700;
    padding: 2px 5px;
`;
