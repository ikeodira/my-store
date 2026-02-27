import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from './product.type';

@Injectable()
export class ProductsService {
    private products: ProductType[] = [];
    private nextId = 1;

    findAll(): ProductType[] {
        return this.products;
    }

    findOne(id: number): ProductType {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    create(product: Omit<ProductType, 'id' | 'createdAt'>): ProductType {
        const newProduct: ProductType = {
            id: this.nextId++,
            ...product,
            createdAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(
        id: number,
        product: Partial<Omit<ProductType, 'id' | 'createdAt'>>,
    ): ProductType {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        this.products[index] = { ...this.products[index], ...product };
        return this.products[index];
    }

    remove(id: number): { message: string } {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        this.products.splice(index, 1);
        return { message: `Product with id ${id} has been deleted` };
    }
}
