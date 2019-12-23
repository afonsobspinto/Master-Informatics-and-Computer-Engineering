import { Constants } from 'expo'
import localIP from './localIP'

const ENV = {
  dev: {
    apiUrl: `http://${localIP.localIP}:8000/`
  },
  staging: {
    apiUrl: 'http://167.99.128.178:8080/'
  },
  prod: {
    apiUrl: 'http://167.99.128.178:8000/'
  }
}

function getEnvVars (env = '') {
  // if (env === null || env === undefined || env === '')

  if (__DEV__) {
    return ENV.dev
  }
  return ENV.prod

  // if (env.indexOf('dev') !== -1) return ENV.dev
  // if (env.indexOf('staging') !== -1) return ENV.staging
  // if (env.indexOf('prod') !== -1) return ENV.prod
}

export default getEnvVars(Constants.manifest.releaseChannel)
