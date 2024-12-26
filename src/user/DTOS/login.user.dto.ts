import { IsNotEmpty, IsString, Matches, MinLength, MaxLength } from "class-validator";


export class LoginUserDto {

    @IsNotEmpty({ message: "Email must not be empty" })
    @IsString({ message: "Email must be string" })
    @Matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        { message: "Email must be a valid format" }
    )
    email: string

    @MinLength(5, { message: "Password must be minimum 5 characters" })
    @MaxLength(15, { message: "Password must be maximum 15 characters" })
    password: string
}