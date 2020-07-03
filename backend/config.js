export default {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/gestion-de-secrets',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
} 