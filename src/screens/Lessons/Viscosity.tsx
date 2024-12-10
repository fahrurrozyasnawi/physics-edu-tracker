import HFNumberInput from '@components/input/HFNumberInput';
import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {OnBufferData, OnVideoErrorData} from 'react-native-video';
import useImportVideo from 'src/hooks/useImportVideo';
import {boolean, z} from 'zod';

const baseSchema = z.object({
  radius: z.number(),
  densityT: z.number(),
  densityF: z.number(),
  // accelG: z.number(),
});

type FormValues = z.infer<typeof baseSchema>;

const requestVideoPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      {
        title: 'Video Permission',
        message: 'This app needs access to your media video',
        buttonNeutral: 'Ask me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Allow',
      },
    );
    console.log('permission result', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission Allowed');
    } else {
      console.log('Permission rejected');
    }
  } catch (error) {
    console.warn(error);
  }
};

const Viscosity = () => {
  const theme = useTheme();

  const [frameUri, setFrameUri] = useState<string | null>(null);

  const {videoUri, uploadVideo} = useImportVideo();

  const {control, handleSubmit} = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
  });

  const extractFrame = async () => {
    try {
    } catch (error) {
      console.log('error extract video', error);
    }
  };

  const onError = (error: OnVideoErrorData) => {
    console.log('error', error);
  };

  const onSubmit: SubmitHandler<FormValues> = async values => {
    console.log('values', values);
  };

  return (
    <Container>
      <Text variant="titleMedium">Masukkan Nilai</Text>
      <VStack style={styles.inputLayout}>
        <HFNumberInput name="radius" control={control} label="Jari-jari" />
        <HFNumberInput
          name="densityT"
          control={control}
          label="Massa Jenis Benda"
        />
        <HFNumberInput
          name="densityF"
          control={control}
          label="Massa Jenis Fluida"
        />
      </VStack>
      <VStack style={styles.uploadLayout}>
        <Text variant="titleMedium">Import Video</Text>
        {videoUri && (
          <VideoPlayer
            src={videoUri}
            onError={onError}
            paused={true}
            controls={true}
          />
        )}
        <Button onPress={uploadVideo} mode="contained">
          Select Video
        </Button>
      </VStack>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.submit}
        mode="contained">
        Submit
      </Button>
    </Container>
  );
};

export default Viscosity;

const styles = StyleSheet.create({
  inputLayout: {
    gap: 2,
  },
  uploadLayout: {
    marginTop: 8,
    gap: 12,
  },
  submit: {
    marginTop: 12,
  },
});
