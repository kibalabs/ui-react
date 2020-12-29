import { RecursivePartial } from '@kibalabs/core';

import { IFont } from './theme';

export const buildFonts = (base?: RecursivePartial<Record<string, IFont>>): Record<string, IFont> => {
  if (!base) {
    return {};
  }
  const output = Object.keys(base).reduce((current: Record<string, IFont>, name: string): Record<string, IFont> => {
    const baseUrl = base[name]?.url;
    if (baseUrl) {
      current[name] = {url: baseUrl.replace('//fonts.googleapis.com/', '//assets.evrpg.com/gfonts/')};
    }
    return current;
  }, {} as Record<string, IFont>);
  return output;
}
