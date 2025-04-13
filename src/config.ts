import dotenv from 'dotenv';
dotenv.config();

interface Config {
    databaseUri: string;
    jwtSecret: string;
}

const config: Config = {
    databaseUri: process.env.MONGO_URI || 'default_database_uri',
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
};

export default config;