/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ThemeContext} from '@context/Theme';
import _theme from '@theme';

export default function Main() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = React.useCallback(() => {
    return setIsDark(!isDark);
  }, [isDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isDark,
    }),
    [toggleTheme, isDark],
  );

  const theme = _theme(isDark);

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
