import HFNumberInput from '@components/input/HFNumberInput';
import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useImportVideo from 'src/hooks/useImportVideo';
import {z} from 'zod';

const baseSchema = z.object({
  time: z.number(),
  freq: z.number(),
});

type FormValues = z.infer<typeof baseSchema>;

const Pendulum = () => {
  const {videoUri, uploadVideo} = useImportVideo();
  const {control, handleSubmit} = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async values => {
    console.log('values', values);
  };

  return (
    <Container>
      <Text variant="titleMedium">Masukkan Nilai</Text>
      <VStack style={styles.inputLayout}>
        <HFNumberInput name="time" control={control} label="Waktu" />
        <HFNumberInput name="freq" control={control} label="Frekuensi" />
      </VStack>

      <VStack style={styles.uploadLayout}>
        <Text variant="titleMedium">Import Video</Text>
        {videoUri && <VideoPlayer src={videoUri} controls={true} />}
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

export default Pendulum;

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
