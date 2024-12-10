import {getHeaderTitle} from '@react-navigation/elements';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Appbar, Switch, Text, useTheme} from 'react-native-paper';
import {ThemeContext} from '@context/Theme';
import HStack from '@components/stack view/HStack';
import {StyleSheet} from 'react-native';

export default function Header(props: NativeStackHeaderProps) {
  const {toggleTheme, isDark} = useContext(ThemeContext);
  const theme = useTheme();

  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      {props.back && (
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      )}

      <Appbar.Content title={title} />

      <HStack style={styles.layoutSwitch}>
        <Text>Dark</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </HStack>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  layoutSwitch: {
    alignItems: 'center',
  },
});
