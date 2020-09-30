import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const StatusStreamingBadgeStyled = styled.div`
    ${space};

    background-color: ${variable.colorWhite};
    border: 1px solid ${({ type }) => (type === 'Ao vivo' ? variable.colorRed : variable.colorGreen)};
    border-radius: 4px;
    color: ${({ type }) => (type === 'Ao vivo' ? variable.colorRed : variable.colorGreen)};
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    padding: 2px 5px;
    vertical-align: bottom;
`;
