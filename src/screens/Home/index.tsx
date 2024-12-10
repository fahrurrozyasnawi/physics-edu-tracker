import Container from '@components/layout/container';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container style={styles.container}>
      {listLesson.map(item => (
        <Card
          onPress={() => navigation.navigate(item.title as never)}
          style={styles.card}
          key={item.title}>
          <Card.Title
            title={item.title}
            titleVariant="titleLarge"
            titleStyle={styles.title}
          />
          <Card.Cover source={item.img} />
        </Card>
      ))}
    </Container>
  );
};

const listLesson = [
  {
    title: 'Gerak Parabola',
    img: require('../../assets/projectile-motion.png'),
  },
  {
    title: 'Gerak Harmonik',
    img: require('../../assets/pendulum.png'),
  },
  {
    title: 'Viskositas',
    img: require('../../assets/viscosity.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  card: {
    // flexGrow: 1,
    // height: 90,
    width: '100%',
  },
});

export default Home;
