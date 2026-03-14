import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['owner'] });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
        const product = this.productRepository.create({
            ...createProductDto,
            ownerId: userId,
        });
        return this.productRepository.save(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }

    async remove(id: number): Promise<{ message: string }> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return { message: `Product with id ${id} has been deleted` };
    }
}
