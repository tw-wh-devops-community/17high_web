import baseConfig from '../config/base.json';

/* eslint-disable */
function chooseEnvConfig() {
  return { ...baseConfig, ...require(`../config/${process.env.NODE_ENV}.json`) };
}

export default chooseEnvConfig();
