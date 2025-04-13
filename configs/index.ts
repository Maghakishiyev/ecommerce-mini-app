import dotenv from 'dotenv';
dotenv.config();

interface Config {
    port: string;
    jwt_secret: string;
    mongo_uri: string;
}

const config: Config = {
    port: `${process.env.PORT}`,
    jwt_secret: process.env.JWT_SECRET || '-|your@_@default@_@secret|-',
    mongo_uri: `${process.env.MONGO_URI}`,
};

export default config;
