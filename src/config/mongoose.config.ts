import { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const MONGODB: string = process.env.MONGODB;

export const MONGOOSE_OPTIONS = {
    onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('🚀 Mongodb connected successfully.'));
        connection.on('open', () => console.log('🟢 Mongodb opened successfully. '));
        connection.on('disconnected', () => console.log('🛑 Mongodb disconnected successfully.'));
        connection.on('reconnected', () => console.log('📡 Mongodb reconnected successfully...'));
        connection.on('disconnecting', () => console.log('🚪 Mongodb disconnecting...'));
    }
}