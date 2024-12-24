import { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const {
    MONGODB_HOST = "127.0.0.1",
    MONGODB_PORT = 27017,
    MONGODB_USERNAME = "",
    MONGODB_PASSWORD = "",
    MONGODB_DB_NAME = "nest-app"
} = process.env

let MONGODB: string;
if (process.env.MONGODB) {
    console.log("🎉 Mongodb connecting with connection string url...")
    MONGODB = process.env.MONGODB
}
else if (MONGODB_USERNAME && MONGODB_PASSWORD) {
    console.log("🎉Mongodb connecting with connection username and password...")
    MONGODB = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}?authMechanism=DEFAULT&authSource=admin`;
}
else {
    console.log("🎉Mongodb connecting without connection username and password...")
    MONGODB = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}`
}


export { MONGODB };


export const MONGOOSE_OPTIONS = {
    onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('🚀 Mongodb connected successfully.'));
        connection.on('open', () => console.log('🟢 Mongodb opened successfully. '));
        connection.on('disconnected', () => console.log('🛑 Mongodb disconnected successfully.'));
        connection.on('reconnected', () => console.log('📡 Mongodb reconnected successfully...'));
        connection.on('disconnecting', () => console.log('🚪 Mongodb disconnecting...'));
    }
}