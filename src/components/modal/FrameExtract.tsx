import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Modal} from 'react-native-paper';
import HStack from '@components/stack view/HStack';
import VideoPlayer from '@components/media/VideoPlayer';
import {OnProgressData, ReactVideoEvents} from 'react-native-video';

type FrameProps = {
  visible: boolean;
  videoUri: string;
};

const controlOptions = {
  hidePlayPause: true,
  hideForward: true,
  hideRewind: true,
  hideNext: true,
  hidePrevious: true,
  hideFullscren: true,
};

const FrameExtract = ({visible, videoUri}: FrameProps) => {
  const handleProgressChange = (event: OnProgressData) => {
    console.log('event', event);
  };

  return (
    <Modal visible={visible}>
      <HStack>
        <VideoPlayer
          src={videoUri}
          paused={true}
          controlsStyles={controlOptions}
          onProgress={handleProgressChange}
        />

        <Button>Extract Frame</Button>
      </HStack>
    </Modal>
  );
};

export default FrameExtract;

const styles = StyleSheet.create({
  stack: {
    gap: 2,
  },
});
