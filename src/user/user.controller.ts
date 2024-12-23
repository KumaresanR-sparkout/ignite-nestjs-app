import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { encryptText, decryptText } from "../utils/crypto_service";
import { encryptHash, decryptHash } from "../utils/hash_service";
import { errorResponse, successResponse } from 'src/utils/response_handler';

@Controller('/api/v1/user')
export class UserController {

    @Get("/")
    async getUser(@Req() req: Request, @Res() res: Response) {
        try {

            const encryptData: string = encryptText({ name: "TYpescript" })
            const decryptData: object = decryptText(encryptData)
            const hashedText: string = encryptHash("kumaresan")
            const comparedhash: boolean = decryptHash("kumaresan", hashedText)
            return successResponse(res, 200, "Encrypt and decrypt data", { encryptData, decryptData, hashedText, comparedhash })
        }
        catch (error) {
            return errorResponse(res, 500, "Internal server error")
        }
    }
}
