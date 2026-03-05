import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { ProductType } from './product.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // GET /products
    @Get()
    findAll(): ProductType[] {
        return this.productsService.findAll();
    }

    // GET /products/:id
    @Get(':id')
    findOne(@Param('id') id: string): ProductType {
        return this.productsService.findOne(+id);
    }

    // POST /products
    @Post()
    create(@Body() createProductDto: CreateProductDto): ProductType {
        return this.productsService.create(createProductDto);
    }

    // PATCH /products/:id
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): ProductType {
        return this.productsService.update(+id, updateProductDto);
    }

    // DELETE /products/:id
    @Delete(':id')
    remove(@Param('id') id: string): { message: string } {
        return this.productsService.remove(+id);
    }
}
