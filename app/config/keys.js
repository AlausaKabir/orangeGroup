import dotenv from 'dotenv'

dotenv.config()

const keys = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    BCRYPT: process.env.BCRYPT,
    jwt: {
        refresh: process.env.JWT_REFRESH_TOKEN,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
        refreshExpires: process.env.JWT_REFRESH_EXPIRES
    }
}
export default keys