const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminName: process.env.ADMIN_NAME || 'Skillify Admin',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@skillify.local',
  adminPassword: process.env.ADMIN_PASSWORD || '',
};

function validateConfig() {
  const missing = ['mongoUri', 'jwtSecret', 'adminPassword'].filter((key) => !config[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { ...config, validateConfig };
