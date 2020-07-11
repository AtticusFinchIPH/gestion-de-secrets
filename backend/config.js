import dotenv from 'dotenv';
dotenv.config();

export default {
    SERVER_API_URL: process.env.SERVER_API_URL || 'http://localhost:5000/api',
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/gestion-de-secrets',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookiesecret',
} 