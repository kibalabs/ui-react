// eslint-disable-next-line import/no-extraneous-dependencies
import scss from 'rollup-plugin-scss';

export default (config) => {
  const newConfig = config;
  newConfig.rolldownConfigModifier = (innerConfig) => {
    const newInnerConfig = innerConfig;
    newInnerConfig.plugins.push(scss({
      fileName: 'output.css',
    }));
    newInnerConfig.preserveModules = true;
    return newInnerConfig;
  };
  return newConfig;
};
