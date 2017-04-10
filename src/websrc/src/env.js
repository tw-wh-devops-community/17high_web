import baseConfig from '../config/base.json';

function chooseEnvConfig() {
  return { ...baseConfig, ...require(`../config/${process.env.NODE_ENV}.json`) };
}

export default chooseEnvConfig();
