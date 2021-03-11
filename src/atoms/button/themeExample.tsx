import React from 'react';

import { Button } from '.';
import { Stack } from '../../layouts';
import { Direction } from '../../model';
import { MultiLineInput, TabBar } from '../../molecules';
import { Box, PaddingSize, Spacing } from '../../particles';
import { buildTheme, ThemeProvider, useTheme } from '../../theming';

export const ButtonThemeExample = () => {
  const defaultTheme = useTheme();
  const [themeData, setThemeData] = React.useState({});
  const [permanentState, setPermanentState] = React.useState('normal');
  const [temporaryState, setTemporaryState] = React.useState('default');
  const [themeEditorField, setThemeEditorField] = React.useState(JSON.stringify(defaultTheme.buttons.default[permanentState][temporaryState], undefined, 4));
  const [theme, setTheme] = React.useState(defaultTheme);

  React.useEffect(() => {
    const value = theme.buttons.default[permanentState][temporaryState];
    if (value === undefined) {
      setThemeEditorField('{}');
    } else {
      setThemeEditorField(JSON.stringify(value, undefined, 4));
    }
  },
  [permanentState, temporaryState]);

  React.useEffect(() => {
    setTimeout(() => {
      const otherStates = theme.buttons.default[permanentState];
      setTheme(buildTheme({
        boxes: {
          bordered: {
            padding: '0px 0px',
          },
        },
        buttons: {
          default: {
            ...(theme.buttons.default),
            [permanentState]: {
              ...otherStates,
              [temporaryState]: {
                ...themeData,
              },
            },
          },
        },
      }));
    }, 2000);
  },
  [themeData]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const changedValue = JSON.parse(themeEditorField);
      if (JSON.stringify(changedValue) !== JSON.stringify(defaultTheme.buttons.default[permanentState][temporaryState])) {
        setThemeData(changedValue);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [themeEditorField]);

  return (
    <ThemeProvider theme={theme}>
      <Button text='Themed Button' />
      <Spacing variant={PaddingSize.Wide} />
      <Box maxHeight='500px' variant='bordered'>
        <Stack direction={Direction.Vertical}>
          <TabBar selectedTabKey={permanentState} onTabKeySelected={setPermanentState}>
            <TabBar.Item tabKey='normal' isEnabled={true} isExpandable={false} text='Normal' />
            <TabBar.Item tabKey='disabled' isEnabled={true} isExpandable={false} text='Disabled' />
          </TabBar>
          <Box variant='bordered'>
            <TabBar selectedTabKey={temporaryState} onTabKeySelected={setTemporaryState}>
              <TabBar.Item tabKey='default' isEnabled={true} isExpandable={false} text='Default' />
              <TabBar.Item tabKey='hover' isEnabled={true} isExpandable={false} text='Hover' />
              <TabBar.Item tabKey='focus' isEnabled={true} isExpandable={false} text='Focus' />
              <TabBar.Item tabKey='press' isEnabled={true} isExpandable={false} text='Press' />
            </TabBar>
            <Stack direction={Direction.Vertical} defaultGutter={PaddingSize.Wide} shouldAddGutters={true}>
              <MultiLineInput minRowCount={10} value={themeEditorField} onValueChanged={setThemeEditorField} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
