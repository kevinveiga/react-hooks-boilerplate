import React from 'react';

import {
    MinhaContaConversacaoStyled,
    MinhaContaConversacaoImageContainerStyled,
    MinhaContaConversacaoImageLineStyled,
    MinhaContaConversacaoItemStyled,
    MinhaContaConversacaoListStyled
} from './MinhaContaStyled';

import { Box } from '../../../style/flex';
import { Image } from '../../../style/image';
import { P } from '../../../style/text';

const MinhaContaConversacao = ({ obj, ...props }) => {
    return (
        <MinhaContaConversacaoStyled>
            <MinhaContaConversacaoListStyled>
                <MinhaContaConversacaoItemStyled>
                    <MinhaContaConversacaoImageLineStyled>
                        <MinhaContaConversacaoImageContainerStyled>
                            <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                        </MinhaContaConversacaoImageContainerStyled>
                    </MinhaContaConversacaoImageLineStyled>

                    <Box width="100%">
                        <P fontWeight="700">Vita Silva</P>
                        <P>It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off?</P>
                        <P color="colorGray2" fontSize="14px">
                            23 Ago. 2019
                        </P>
                    </Box>
                </MinhaContaConversacaoItemStyled>

                <MinhaContaConversacaoItemStyled>
                    <MinhaContaConversacaoImageLineStyled>
                        <MinhaContaConversacaoImageContainerStyled>
                            <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                        </MinhaContaConversacaoImageContainerStyled>
                    </MinhaContaConversacaoImageLineStyled>

                    <Box width="100%">
                        <P fontWeight="700">Ricardo Milos</P>
                        <P>Our passengers must be hotter than I thought.</P>
                        <P color="colorGray2" fontSize="14px">
                            25 Ago. 2019
                        </P>
                    </Box>
                </MinhaContaConversacaoItemStyled>

                <MinhaContaConversacaoItemStyled>
                    <MinhaContaConversacaoImageContainerStyled>
                        <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                    </MinhaContaConversacaoImageContainerStyled>

                    <Box width="100%">
                        <P color="colorPrimary" fontWeight="700">
                            Equipe
                        </P>
                        <P>It looks like an Imperial cruiser. Our passenger.</P>
                        <P color="colorGray2" fontSize="14px">
                            23 Ago. 2019
                        </P>
                    </Box>
                </MinhaContaConversacaoItemStyled>
            </MinhaContaConversacaoListStyled>

            <MinhaContaConversacaoListStyled>
                <MinhaContaConversacaoItemStyled>
                    <MinhaContaConversacaoImageLineStyled>
                        <MinhaContaConversacaoImageContainerStyled>
                            <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                        </MinhaContaConversacaoImageContainerStyled>
                    </MinhaContaConversacaoImageLineStyled>

                    <Box width="100%">
                        <P fontWeight="700">Gilberto Silva</P>
                        <P>It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off?</P>
                        <P color="colorGray2" fontSize="14px">
                            23 Ago. 2019
                        </P>
                    </Box>
                </MinhaContaConversacaoItemStyled>

                <MinhaContaConversacaoItemStyled>
                    <MinhaContaConversacaoImageContainerStyled>
                        <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                    </MinhaContaConversacaoImageContainerStyled>

                    <Box width="100%">
                        <P color="colorPrimary" fontWeight="700">
                            Equipe
                        </P>
                        <P>It looks like an Imperial cruiser. Our passenger.</P>
                        <P color="colorGray2" fontSize="14px">
                            23 Ago. 2019
                        </P>
                    </Box>
                </MinhaContaConversacaoItemStyled>
            </MinhaContaConversacaoListStyled>
        </MinhaContaConversacaoStyled>
    );
};

export default MinhaContaConversacao;
