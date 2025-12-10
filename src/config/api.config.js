const ENV_VALUES = {
  DEVELOPMENT_HOST: 'localhost',
  API_PORT: '5005',
  PRODUCTION_API_URL: 'http://localhost:5005/api/v1',
  NODE_ENV: 'development',
};

const isDevelopment = 'development';



export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? `http://localhost:5005/api/v1`
    : ENV_VALUES.PRODUCTION_API_URL,
  
  TIMEOUT: 10000,
  
  // Port yapılandırması
  PORT: parseInt(ENV_VALUES.API_PORT, 10),
  
  // Development Host
  DEVELOPMENT_HOST: ENV_VALUES.DEVELOPMENT_HOST,
  
  // Environment info
  IS_DEVELOPMENT: isDevelopment,
  
  // Debug info
  DEBUG_INFO: {
    isDev: isDevelopment,
    BASE_URL: isDevelopment 
      ? ` http://localhost:5005/api/v1`
      : ENV_VALUES.PRODUCTION_API_URL
  }
};

export default API_CONFIG;
