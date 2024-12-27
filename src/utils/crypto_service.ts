import crypto from 'node:crypto'

// CONSTANTS
// the key should be 32 bytes
const secretKey = process.env.CRYPTO_SECRET || 'acdefgerhtuwdtuvnnewhkmnbvewierr'

// This function is converting palin text to hexa decimal ecryption format
export const encryptText = (rawData: object | string) => {
    try {
        const rawDataString = JSON.stringify(rawData)
        const iv: string = crypto.randomBytes(12).toString('hex')
        const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv)
        let encrypted: string = cipher.update(rawDataString, "utf8", 'hex')
        encrypted += cipher.final('hex')
        const authTag: string = cipher.getAuthTag().toString('hex')
        return iv + ':' + encrypted + ':' + authTag
    }
    catch (error) {
        console.error(error)
    }
}

// This function is converting cipher text to plain text
export const decryptText = (encryptData: string) => {
    try {
        const iv: string = encryptData.split(':')[0]
        const encrypt: string = encryptData.split(':')[1]
        const authTag: string = encryptData.split(':')[2]
        const decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv)
        decipher.setAuthTag(Buffer.from(authTag, 'hex'))
        let decrypted: string = decipher.update(encrypt, 'hex', "utf8")
        decrypted += decipher.final("utf8")
        return JSON.parse(decrypted)
    }
    catch (error) {
        console.log(error.message)
    }
}