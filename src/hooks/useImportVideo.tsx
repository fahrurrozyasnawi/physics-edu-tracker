import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {cleanFiles, showEditor} from 'react-native-video-trim';

type UseUploadVideoResults = {
  videoUri: string | null;
  uploadVideo: () => Promise<void>;
};

type Props = {
  enableVideoTrim?: boolean;
};

const useImportVideo = (props: Props = {}): UseUploadVideoResults => {
  const {enableVideoTrim = true} = props;
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const uploadVideo = async () => {
    console.log('running');
    const result = await launchImageLibrary({
      mediaType: 'video',
    });

    const uri = result.assets![0]?.uri || '';
    console.log('uri', uri);
    if (uri) {
      if (enableVideoTrim) {
        await cleanFiles();
        showEditor(uri, {
          minDuration: 8,
        });
      } else {
        setVideoUri(uri);
      }
    }
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', event => {
      switch (event.name) {
        case 'onFinishTrimming': {
          console.log('onFinishTrimming', event);

          const filePath = `file://${event.outputPath}`;
          setVideoUri(filePath);
          break;
        }
        case 'onLoad': {
          console.log('onLoad', event);
          break;
        }
        case 'onError': {
          console.log('onError', event);
          break;
        }
        default:
          break;
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {videoUri, uploadVideo};
};

export default useImportVideo;
