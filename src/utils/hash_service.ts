import crypto from 'node:crypto'
import dotenv from "dotenv"
dotenv.config()

// This Function converts the raw data into hexa decimal format
export const encryptHash = (rawData: string) => {
    try {
        const encrypt = crypto.createHmac('sha256', process.env.SECRET_KEY) //use your secret key
            .update(rawData).digest('hex')
        return encrypt;
    }
    catch (error) {
        console.log(error)
    }
}

// This Function checks wheather the raw data matches with encrypt data
export const decryptHash = (rawData: string, encryptData: string) => {
    try {
        const hash = crypto.createHmac('sha256', process.env.SECRET_KEY) //use your secret key
            .update(rawData).digest('hex')
        if (hash === encryptData) {
            return true
        }
        return false
    }
    catch (error) {
        console.log(error);
    }
}