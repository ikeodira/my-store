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
    create(
        @Body() body: Omit<ProductType, 'id' | 'createdAt'>,
    ): ProductType {
        return this.productsService.create(body);
    }

    // PATCH /products/:id
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: Partial<Omit<ProductType, 'id' | 'createdAt'>>,
    ): ProductType {
        return this.productsService.update(+id, body);
    }

    // DELETE /products/:id
    @Delete(':id')
    remove(@Param('id') id: string): { message: string } {
        return this.productsService.remove(+id);
    }
}
