import React from 'react';

import YouTube from 'react-youtube';

import { useCurrentVideo } from '../../../store/video/video';

import { getVideoId } from '../../../util/getVideoId';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';

import { VideoBoxStyled, VideoGridStyled, VideoLiStyled, VideoUlStyled } from './HomeVideoStyled';

import { Box } from '../../../style/flex';
import { Cell } from '../../../style/grid';
import { VideoWrap } from '../../../style/layout';
import { Title4, Title5 } from '../../../style/text';

export const HomeVideo = ({ ancor, objectVideos, ...otherProps }) => {
    // ACTION
    const [stateCurrentVideo, setStateCurrentVideo] = useCurrentVideo(ancor.elementId, ancor.offset);

    return (
        <VideoGridStyled display="grid" gridTemplateColumns={{ d: '1fr', md: '2fr 1fr' }} mb={5} {...otherProps}>
            <Cell>
                <Box maxHeight="55vh" minHeight="25vh" overflowY="hidden">
                    <VideoWrap>
                        <YouTube id="video" videoId={(stateCurrentVideo && getVideoId(stateCurrentVideo.video)) || getVideoId(objectVideos.data[0].video) || ''} />
                    </VideoWrap>
                </Box>

                <VideoBoxStyled p={4}>
                    <p>Vídeo</p>

                    <Title4 fontWeight="600" themeColor="dark">
                        {(stateCurrentVideo && stateCurrentVideo.title) || objectVideos.data[0].title}
                    </Title4>
                </VideoBoxStyled>
            </Cell>

            <Cell>
                <VideoBoxStyled p={4} themeColor="dark">
                    <Title5 fontWeight="600" themeColor="light">
                        Próximos Vídeos
                    </Title5>
                </VideoBoxStyled>

                <VideoUlStyled>
                    {objectVideos.data.map((video, i, array) => {
                        return (
                            <VideoLiStyled
                                active={objectVideos.data.video === video.video || false}
                                borderBottom={array.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'}
                                hover="true"
                                key={getVideoId(video.video)}
                                onClick={() => setStateCurrentVideo(video)}
                                p={4}
                            >
                                <Box alignContent="space-between" display="inline-flex" flexWrap="wrap" height="100px" pr={{ d: 1, sm: 4 }} verticalAlign="middle" width={3 / 5}>
                                    <Box width="100%">
                                        <Title5 fontWeight="600" mb={3} themeColor="dark">
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
    );
};
