import { IsString, IsOptional, IsNotEmpty, Matches, IsNumber, IsEmail, MinLength, MaxLength, IsPhoneNumber } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty({ message: "First name must not be empty" })
    @IsString({ message: " First name must be string" })
    first_name: string

    @IsOptional()
    @IsNotEmpty({ message: "First name must not be empty" })
    @IsString({ message: " First name must be string" })
    last_name: string

    @IsNotEmpty({ message: "First name must not be empty" })
    @Matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        { message: "Email must be a valid format" }
    )
    email: string

    @MinLength(5, { message: "Password must be minimum 5 characters" })
    @MaxLength(15, { message: "Password must be maximum 15 characters" })
    password: string

    @IsPhoneNumber("IN", { message: "Phone number must be indian number" })
    @IsString({ message: "Phone number must be string" })
    phone_number: string

}