import React from 'react';
import YouTube from 'react-youtube';

import { apiUrlHome } from '../../../config';

import { useVideoApi } from '../../../service/video';

import { useCurrentVideo } from '../../../store/video/video';

import { getVideoId } from '../../../util/getVideoId';

import { VideoBox, VideoGrid, VideoLi, VideoUl } from './HomeVideoStyled';

import { Box } from '../../../style/flex';
import { Cell } from '../../../style/grid';
import { BgImageOverlay1 } from '../../../style/image';
import { VideoWrap } from '../../../style/layout';
import { Title4, Title5 } from '../../../style/text';

export const HomeVideo = () => {
    // API
    const [stateVideos] = useVideoApi(`${apiUrlHome}/videos`, {});

    const videosLength = stateVideos.data.length;

    // ACTION
    const [stateCurrentVideo, setStateCurrentVideo] = useCurrentVideo({}, '#home-video-container', 80);

    return (
        <VideoGrid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridTemplateColumns={{ d: '1fr', md: '2fr 1fr' }} mb={5}>
            <Cell>
                <VideoWrap>
                    <YouTube id="video" videoId={(stateCurrentVideo && getVideoId(stateCurrentVideo.video)) || (videosLength > 0 && getVideoId(stateVideos.data[0].video)) || ''} />
                </VideoWrap>

                <VideoBox p={4}>
                    <p>Vídeo</p>

                    <Title4 fontWeight="600" themeColor="dark">
                        {(stateCurrentVideo && stateCurrentVideo.title) || (videosLength > 0 && stateVideos.data[0].title)}
                    </Title4>
                </VideoBox>
            </Cell>

            <Cell>
                <VideoBox p={4} themeColor="dark">
                    <Title5 fontWeight="600">Próximos Vídeos</Title5>
                </VideoBox>

                <VideoUl>
                    {videosLength > 0 &&
                        stateVideos.data.map((video, i) => {
                            return (
                                <VideoLi active={stateCurrentVideo.video === video.video || false} borderBottom={videosLength === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} hover="true" key={getVideoId(video.video)} onClick={() => setStateCurrentVideo(video)} p={4}>
                                    <Box alignContent="space-between" display="inline-flex" flexWrap="wrap" height="100px" pr={{ d: 1, sm: 4 }} verticalAlign="middle" width={3 / 5}>
                                        <Box width="100%">
                                            <Title5 fontWeight="600" mb={3} themeColor="dark">
                                                {video.title}
                                            </Title5>
                                        </Box>

                                        <p>{video.date}</p>
                                    </Box>

                                    <Box display="inline-flex" height="100px" verticalAlign="middle" width={2 / 5}>
                                        <BgImageOverlay1 url={video.thumbnail && video.thumbnail.url} />
                                    </Box>
                                </VideoLi>
                            );
                        })}
                </VideoUl>
            </Cell>
        </VideoGrid>
    );
};
