import { IsString, IsNumber, MinLength, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;
}
