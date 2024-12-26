import { Controller, Post, Patch, Delete, Get, Param, Req, Res, Body, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { Request, Response } from "express";
import { encryptText } from "../utils/crypto_service";
import { encryptHash, decryptHash } from "../utils/hash_service";
import { errorResponse, successResponse } from 'src/utils/response_handler';
import { ObjectIdValidationParam } from "../utils/ObjectId_dto_validation";
import { CreateUserDto } from "./DTOS/create.user.dto";
import { LoginUserDto } from "./DTOS/login.user.dto";
import { UserService } from "./user.service";

@Controller('/api/v1/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("/")
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUser(@Body() createUser: CreateUserDto, @Req() req: Request, @Res() res: Response) {
        try {

            const isExistUser: object | null = await this.userService.isExistEmail(createUser?.email)

            console.log(isExistUser)

            if (isExistUser) {
                return errorResponse(res, 400, "User already exists with this email.");
            }

            createUser.password = encryptHash(createUser?.password ?? "");
            const user = await this.userService.createUser(createUser);

            if (!user) {
                return errorResponse(res, 400, "User creation failed.");
            }

            user.toObject()
            delete user.password;

            const session: string = encryptText({ id: user?._id ?? "", email: user?.email ?? "" })

            return successResponse(res, 200, "User created successfully.", { user, session })
        }
        catch (error) {
            console.error(error)
            return errorResponse(res, 500, "Internal server error")
        }
    }

    @Post("/login")
    @UsePipes(new ValidationPipe({ transform: true }))
    async loginUser(@Body() loginUser: LoginUserDto, @Req() req: Request, @Res() res: Response) {
        try {
            const user = await this.userService.isExistEmail(loginUser?.email)
            if (!user) {
                return errorResponse(res, 400, "Email not exists")
            }

            if (!decryptHash(loginUser?.password ?? "", user?.password ?? "")) {
                return errorResponse(res, 400, "Invalid password")
            }

            user.toObject()
            delete user?.password

            const session: string = encryptText({ id: user?._id ?? "", email: user?.email ?? "" })

            return successResponse(res, 200, "User logged in successfully", { user, session });
        }
        catch (error) {
            return errorResponse(res, 500, "Internal server error")
        }
    }

    @Get("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserDetails(@Param() params: ObjectIdValidationParam, @Req() req: Request, @Res() res: Response) {
        try {

            const user = await this.userService.findUser(params?.id)

            if (!user) {
                return errorResponse(res, 400, "User not found")
            }
            return successResponse(res, 200, "Object Id validated succesfully", user)
        }
        catch (error) {
            console.error(error)
            return errorResponse(res, 500, "Internal server error")
        }
    }
}
