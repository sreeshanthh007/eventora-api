import dotenv from 'dotenv'
dotenv.config()

export const config = {
    cors:{
        ALLOWED_ORIGIN:process.env.CORS_ALLOWED_ORIGIN ||  "http://localhost:5173",
    },

    server:{
        PORT:process.env.PORT || 3000,
        NODE_ENV:process.env.NODE_DEV || "development"
    },

    database:{
        URI:process.env.DATABASE_URI || "",

    },

    nodemailer:{
        EMAIL_USER:process.env.EMAIL_USER,
        EMAIL_PASS:process.env.EMAIL_PASS
    },

    redis :{
        REDIS_USERNAME:process.env.REDIS_USERNAME || 'default',
        REDIS_PASS:process.env.REDIS_PASSWORD,
        REDIS_PORT:process.env.REDIS_PORT || "10195",
        REDIS_HOST:process.env.REDIS_HOST,

    },
    jwt :{
        JWT_SECRECT_KEY :process.env.JWT_SECRECT_KEY || "your-secrect-key",
        ACCESS_EXPIRES_IN:process.env.ACCESS_EXPIRES_IN || "",
        REFRESH_EXPIRES_IN:process.env.REFRESH_EXPIRES_IN || ""
    },

    otpExpiry:process.env.OTP_EXPIRY_IN_MINUTES || "2",
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || 10,
     OTP_PREFIX:"otp:"

}