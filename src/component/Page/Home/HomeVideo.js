import React, { useCallback } from 'react';

import YouTube from 'react-youtube';

import { apiUrlHome } from '../../../config';

import { useVideoApi } from '../../../service/video';

import { useCurrentVideo } from '../../../store/video/video';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { getVideoId } from '../../../util/getVideoId';

import { Button } from '../../Button/Button';
import { IntersectionObserver } from '../../IntersectionObserver/IntersectionObserver';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkToExternal } from '../../Link/LinkToExternal';
import { Svg } from '../../Svg/Svg';

import { VideoContainerStyled } from './HomeStyled';
import { VideoBoxStyled, VideoGridStyled, VideoLiStyled, VideoUlStyled } from './HomeVideoStyled';

import { Box } from '../../../style/flex';
import { Cell } from '../../../style/grid';
import { Container, VideoWrap } from '../../../style/layout';
import { variable } from '../../../style/variable';
import { Span, Title2, Title4, Title5 } from '../../../style/text';

const HomeVideo = ({ anchor, ...otherProps }) => {
    // API
    const stateVideos = useVideoApi(`${apiUrlHome}/videos`, {});

    const videosLength = stateVideos.data && stateVideos.data.length;

    // ACTION
    const windowWidth = useWindowWidth();

    const [stateCurrentVideo, setStateCurrentVideo] = useCurrentVideo('#home-video', windowWidth < parseInt(variable.md, 10) ? 0 : 80);

    // Function
    const handleCurrentVideo = useCallback(
        (video) => () => {
            setStateCurrentVideo(video);
        },
        [setStateCurrentVideo]
    );

    return (
        videosLength > 0 && (
            <IntersectionObserver>
                <VideoContainerStyled id="home-video">
                    <Container mx="auto" px={3} py={{ d: 4, md: variable.spacingXL }}>
                        <Title2 themeColor="light">Vídeos Liberta</Title2>

                        <VideoGridStyled display="grid" gridTemplateColumns={{ d: '1fr', md: '2fr 1fr' }} mb={5} {...otherProps}>
                            <Cell>
                                <Box maxHeight="470px" minHeight={{ d: '25vh', sm: '35vh' }} overflowY="hidden">
                                    <VideoWrap>
                                        <YouTube id="video" videoId={(stateCurrentVideo && getVideoId(stateCurrentVideo.video)) || getVideoId(stateVideos.data[0].video) || ''} />
                                    </VideoWrap>
                                </Box>

                                <VideoBoxStyled p={4}>
                                    <p>Vídeo</p>

                                    <Title4 fontWeight="700" themeColor="dark">
                                        {(stateCurrentVideo && stateCurrentVideo.title) || stateVideos.data[0].title}
                                    </Title4>
                                </VideoBoxStyled>
                            </Cell>

                            <Cell>
                                <VideoBoxStyled p={4} themeColor="dark">
                                    <Title5 fontWeight="700" themeColor="light">
                                        Próximos Vídeos
                                    </Title5>
                                </VideoBoxStyled>

                                <VideoUlStyled>
                                    {stateVideos.data.map((video, i, array) => {
                                        return (
                                            <VideoLiStyled
                                                active={stateVideos.data.video === video.video || false}
                                                borderBottom={array.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'}
                                                hover="true"
                                                key={getVideoId(video.video)}
                                                onClick={handleCurrentVideo(video)}
                                                p={4}
                                            >
                                                <Box alignContent="space-between" display="inline-flex" flexWrap="wrap" height="100px" pr={{ d: 1, sm: 4 }} verticalAlign="middle" width={3 / 5}>
                                                    <Box width="100%">
                                                        <Title5 fontWeight="700" mb={3} themeColor="dark">
                                                            {video.title}
                                                        </Title5>
                                                    </Box>

                                                    <p>{video.date}</p>
                                                </Box>

                                                <Box display="inline-flex" height="100px" verticalAlign="middle" width={2 / 5}>
                                                    <BgImageLazyLoad key={getVideoId(video.video)} url={video.thumbnail && video.thumbnail.url} />
                                                </Box>
                                            </VideoLiStyled>
                                        );
                                    })}
                                </VideoUlStyled>
                            </Cell>
                        </VideoGridStyled>

                        <Box textAlign="center">
                            <LinkToExternal link="https://www.youtube.com/channel/UCzIIAGs9UiniQgKtXsgFPnQ" target="_blank">
                                <Button>
                                    <Svg display={{ d: 'none', lg: 'inline-block' }} height="25px" mr={2} name="svg-youtube" />
                                    <Span verticalAlign="middle">Siga nosso canal no Youtube</Span>
                                </Button>
                            </LinkToExternal>
                        </Box>
                    </Container>
                </VideoContainerStyled>
            </IntersectionObserver>
        )
    );
};

export default HomeVideo;
