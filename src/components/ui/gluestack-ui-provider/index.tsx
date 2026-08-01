import React, { useEffect, useMemo } from 'react';
import { buildConfig } from './config';
import { DEFAULT_THEME } from '../../../shared/themes';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';
import { useDataStore } from '../../../store/store';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const selectedTheme = useDataStore((s) => s.selectedTheme);

  useEffect(() => {
    setColorScheme(mode === 'system' ? 'unspecified' : mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const themeConfig = useMemo(
    () => buildConfig(selectedTheme ?? DEFAULT_THEME),
    [selectedTheme],
  );

  return (
    <View
      style={[
        themeConfig[colorScheme === 'unspecified' ? 'light' : colorScheme],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
