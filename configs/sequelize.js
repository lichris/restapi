require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const baseDbSetting = {
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  timezone: '+09:00',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
}

module.exports = {
  production: Object.assign({
    database: process.env.DB_NAME,
    logging: false
  }, baseDbSetting),

  development: Object.assign({
    database: process.env.DB_DEV,
    logging: true
  }, baseDbSetting),

  test: Object.assign({
    database: process.env.DB_TEST,
    logging: false
  }, baseDbSetting)
}
