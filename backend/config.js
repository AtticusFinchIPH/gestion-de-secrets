export default {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/gestion-de-secrets',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    GMAIL_USER: process.env.GMAIL_USER || 'atticusfinchiph@gmail.com',
    GMAIL_PASS: process.env.GMAIL_PASS || 'admin123+-*/=',
} 