import React from 'react';

// import { BgImageLazyLoad } from '../LazyLoad/BgImageLazyLoad';

import { Box } from '../../style/flex';
import { P, Title5 } from '../../style/text';

export const Splash = () => {
    return (
        <>
            {/* <BgImageLazyLoad overlayColor="colorBlackTransparent5" url={} /> */}

            <Box p={4} width="100%">
                <P align="right" fontSize="24px" mb={4} textAlign="right" themeColor="light">
                    &quot;Na adversidade, uns desistem,
                    <br />
                    enquanto outros batem recordes.&quot;
                </P>

                <Title5 fontSize="16px" color="colorPrimary" textAlign="right" themeColor="dark">
                    Ayrton Senna
                </Title5>
            </Box>
        </>
    );
};
