import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[+]?[\d\s\-().]{7,15}$/, {
        message: 'phoneNumber must be a valid phone number',
    })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'password must be at least 6 characters long' })
    password: string;
}
