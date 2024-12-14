import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Modal, useTheme} from 'react-native-paper';
import HStack from '@components/stack view/HStack';
import VideoPlayer from '@components/media/VideoPlayer';
import {OnProgressData, ReactVideoEvents} from 'react-native-video';
import VStack from '@components/stack view/VStack';

type FrameProps = {
  visible: boolean;
  videoUri: string;
  onDismiss: () => void;
  onExtract: (duration: number) => void;
};

const controlOptions = {
  hidePlayPause: true,
  hideForward: true,
  hideRewind: true,
  hideNext: true,
  hidePrevious: true,
  hideFullscren: true,
};

const FrameExtract = ({
  visible,
  videoUri,
  onDismiss,
  onExtract,
}: FrameProps) => {
  const theme = useTheme();

  const [duration, setDuration] = useState<number>(0);

  const handleProgressChange = (event: OnProgressData) => {
    console.log('event', event);

    setDuration(event.currentTime);
  };

  return (
    <Modal visible={visible}>
      <HStack style={styles.stack}>
        <VideoPlayer
          src={videoUri}
          paused={true}
          controlsStyles={controlOptions}
          onProgress={handleProgressChange}
        />

        <VStack style={styles.stack}>
          <Button onPress={() => onExtract(duration)}>Extract Frame</Button>
          <Button onPress={onDismiss} buttonColor={theme.colors.error}>
            Cancel
          </Button>
        </VStack>
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
