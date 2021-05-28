import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';

interface ISwitchTheme {
  
}

export const buildSwitchTheme = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ISwitchTheme>>): ThemeMap<ISwitchTheme> => {
  const defaultSwitchTheme = mergeTheme<ISwitchTheme>({
      
  });
}