// eslint-disable-next-line import/no-extraneous-dependencies
import scss from 'rollup-plugin-scss'

export default (config) => {
  const newConfig = config;
  newConfig.rolldownConfigModifier = (innerConfig) => {
    const newInnerConfig = innerConfig;
    newInnerConfig.plugins.push(scss({
      fileName: 'output.css',
    }));
    return newInnerConfig;
  };
  newConfig.preserveModules = true;
  return newConfig;
};
