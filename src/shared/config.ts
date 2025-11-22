import dotenv from "dotenv";
dotenv.config();

export const config = {
  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173",
  },

  server: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_DEV || "development",
  },

  database: {
    URI: process.env.DATABASE_URI || "",
  },

  nodemailer: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },

  redis: {
    REDIS_USERNAME: process.env.REDIS_USERNAME || "default",
    REDIS_PASS: process.env.REDIS_PASSWORD,
    REDIS_PORT: process.env.REDIS_PORT || "10195",
    REDIS_HOST: process.env.REDIS_HOST,
  },
  jwt: {
    JWT_SECRECT_KEY: process.env.JWT_SECRECT_KEY || "your-secrect-key",
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || "",
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || "",
  },

  otpExpiry: process.env.OTP_EXPIRY_IN_MINUTES || "2",
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  OTP_PREFIX: "otp:",

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  stripe:{
    secretKey:process.env.STRIPE_SECRET_KEY,
    webHookSecrect:process.env.STRIPE_WEBHOOK_SECRECT
  },






  
// ============FOR FIREBASE====================
  serviceAccount: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  },
};
