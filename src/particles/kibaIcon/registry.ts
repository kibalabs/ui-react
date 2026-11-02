// NOTE(krishan711): icons bundled into the app at build time by @kibalabs/ui-react/vite-plugin are registered
// here (svg content keyed by icon id, already normalised) so KibaIcon can render them without fetching.
const registeredIcons = new Map<string, string>();

export const registerKibaIcons = (icons: Record<string, string>): void => {
  Object.entries(icons).forEach(([iconId, svgContent]) => {
    registeredIcons.set(iconId, svgContent);
  });
};

export const getRegisteredKibaIcon = (iconId: string): string | undefined => {
  return registeredIcons.get(iconId);
};

export const normalizeKibaIconSvg = (svgContent: string): string => {
  return svgContent.replace(/<title>.*<\/title>/gi, '').replace(/stroke:#000/gi, 'stroke:currentColor').replace(/fill:#000/gi, 'fill:currentColor');
};
