import React from 'react';

import { deepCompare } from '@kibalabs/core';

import { Button } from '.';
import { IButtonTheme } from '..';
import { Stack } from '../../layouts';
import { Direction } from '../../model';
import { MultiLineInput, TabBar } from '../../molecules';
import { PaddingSize, Spacing } from '../../particles';
import { useTheme } from '../../theming';
import { mergeTheme } from '../../util';

const useDebouncedCallback = (delayMillis = 30000): [(callback: (() => void)) => void, () => void] => {
  const timeoutRef = React.useRef<number | null>(null);
  const callbackRef = React.useRef<(() => void) | null>(null);

  const clearCallback = React.useCallback((): void => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      callbackRef.current = null;
    }
  }, []);

  const setCallback = React.useCallback((callback: (() => void)): void => {
    clearCallback();
    callbackRef.current = callback;
    timeoutRef.current = window.setTimeout((): void => {
      if (callbackRef.current) {
        callbackRef.current();
      }
      timeoutRef.current = null;
      callbackRef.current = null;
    }, delayMillis);
  }, [delayMillis, clearCallback]);

  return [setCallback, clearCallback];
};

export const ButtonThemeExample = (): React.ReactElement => {
  const defaultTheme = useTheme();
  const [permanentState, setPermanentState] = React.useState<string>('normal');
  const [temporaryState, setTemporaryState] = React.useState<string>('default');
  const [theme, setTheme] = React.useState<IButtonTheme>(defaultTheme.buttons.default);
  const [themeEditorField, setThemeEditorField] = React.useState<string>('');
  const [setThemeCallback, clearSetThemeCallback] = useDebouncedCallback(100);
  const currentThemeValue = React.useRef<IButtonTheme>(theme);

  React.useEffect((): void => {
    currentThemeValue.current = theme;
  }, [theme]);

  React.useEffect((): void => {
    // @ts-ignore NOTE(krishan711): not sure how to type this!
    const value = currentThemeValue.current[permanentState][temporaryState];
    setThemeEditorField(value ? JSON.stringify(value, undefined, 4) : '{}');
  }, [permanentState, temporaryState]);

  React.useEffect(() => {
    clearSetThemeCallback();
    setThemeCallback((): void => {
      const newTheme = mergeTheme<IButtonTheme>(currentThemeValue.current, { [permanentState]: { [temporaryState]: JSON.parse(themeEditorField) } });
      if (!deepCompare(newTheme, currentThemeValue.current)) {
        setTheme(newTheme);
      }
    });
    return clearSetThemeCallback;
  }, [themeEditorField, setThemeCallback, clearSetThemeCallback, permanentState, temporaryState]);

  return (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Button text='Themed Button' theme={theme} />
      <Spacing variant={PaddingSize.Wide} />
      <TabBar selectedTabKey={permanentState} onTabKeySelected={setPermanentState}>
        <TabBar.Item tabKey='normal' text='Normal' />
        <TabBar.Item tabKey='disabled' text='Disabled' />
      </TabBar>
      <TabBar selectedTabKey={temporaryState} onTabKeySelected={setTemporaryState}>
        <TabBar.Item tabKey='default' text='Default' />
        <TabBar.Item tabKey='hover' text='Hover' />
        <TabBar.Item tabKey='focus' text='Focus' />
        <TabBar.Item tabKey='press' text='Press' />
      </TabBar>
      <MultiLineInput minRowCount={10} value={themeEditorField} onValueChanged={setThemeEditorField} />
    </Stack>
  );
};
