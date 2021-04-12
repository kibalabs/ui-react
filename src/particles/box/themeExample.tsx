import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { useDebouncedCallback } from '@kibalabs/core-react';

import { Box, IBoxTheme } from '.';
import { Text } from '..';
import { Stack } from '../../layouts';
import { Direction } from '../../model';
import { MultiLineInput } from '../../molecules';
import { PaddingSize, Spacing } from '../../particles';
import { useTheme } from '../../theming';
import { mergeTheme } from '../../util';

export const BoxThemeExample = (): React.ReactElement => {
  const defaultTheme = useTheme();
  const [theme, setTheme] = React.useState<IBoxTheme>(defaultTheme.boxes.default);
  const [themeEditorField, setThemeEditorField] = React.useState<string>('');
  const [setThemeCallback, clearSetThemeCallback] = useDebouncedCallback(1000);
  const currentThemeValue = React.useRef<IBoxTheme>(theme);

  React.useEffect((): void => {
    currentThemeValue.current = theme;
    setThemeEditorField(JSON.stringify(currentThemeValue.current, undefined, 4));
  }, [theme]);

  React.useEffect(() => {
    clearSetThemeCallback();
    setThemeCallback((): void => {
      const newTheme = mergeTheme<IBoxTheme>(currentThemeValue.current, JSON.parse(themeEditorField));
      if (!deepCompare(newTheme, currentThemeValue.current)) {
        setTheme(newTheme);
      }
    });
    return clearSetThemeCallback;
  }, [themeEditorField, setThemeCallback, clearSetThemeCallback]);

  return (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Box variant='card'>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          <Text>Change the theme and see the changes in the box below</Text>
          <Box theme={theme} width='200px' height='50px' />
        </Stack>
      </Box>
      <Spacing variant={PaddingSize.Wide} />
      <Text>Default Theme</Text>
      <MultiLineInput minRowCount={10} value={themeEditorField} onValueChanged={setThemeEditorField} />
    </Stack>
  );
};
