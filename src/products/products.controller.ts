import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // GET /products  (public)
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    // GET /products/:id  (public)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    // POST /products  (protected)
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createProductDto: CreateProductDto, @Request() req: any) {
        return this.productsService.create(createProductDto, req.user.id);
    }

    // PATCH /products/:id  (protected)
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    // DELETE /products/:id  (protected)
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
