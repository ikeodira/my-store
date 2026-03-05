import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @MinLength(3)
    name?: string;

    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price?: number;
}
