import fs from 'node:fs';
import path from 'node:path';

import * as sass from 'sass';

const sassPlugin = {
  name: 'sass',
  resolveId(source, importer) {
    if (!source.endsWith('.scss')) {
      return null;
    }
    // Resolve the full path of the scss file
    const resolved = path.resolve(path.dirname(importer || ''), source);
    // Return the .css version
    return resolved.replace('.scss', '.css');
  },
  load(id) {
    // If loading a .css file that has a corresponding .scss source, compile it
    if (id.endsWith('.css')) {
      const scssPath = id.replace('.css', '.scss');
      if (fs.existsSync(scssPath)) {
        const result = sass.compile(scssPath, {
          style: 'expanded',
          loadPaths: ['node_modules'],
        });
        return result.css;
      }
    }
    return null;
  },
};

export default (config) => {
  const newConfig = config;
  newConfig.rolldownConfigModifier = (rolldownConfig) => {
    const newRolldownConfig = rolldownConfig;
    newRolldownConfig.plugins = [sassPlugin, ...rolldownConfig.plugins];
    return newRolldownConfig;
  };
  return newConfig;
};
