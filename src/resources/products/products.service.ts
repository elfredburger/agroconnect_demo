import {
    getAllDb,
    deleteFromDb,
    createObjectDb,
    updateObjectDb,
    getFromDb,
} from '@/utils/scripts/sqlQueries';

import HttpException from '@/utils/exceptions/http.exception';

import Product from '@/resources/products/product.interface';

class ProductService {
    public async getAllProducts(): Promise<Product[]> {
        const products: Product[] = await getAllDb('products');
        return products;
    }

    public async createProduct(product: Product): Promise<string> {
        const newProduct = await createObjectDb(product, 'products');
        return newProduct;
    }

    public async getProduct(param: object): Promise<Product[]> {
        const product = await getFromDb(param, 'products');
        if (product.length == 0) {
            throw new HttpException(409, 'Product not found');
        }
        return product;
    }

    public async updateProduct(
        param: object,
        product: Product,
    ): Promise<string> {
        const updatedProduct = await updateObjectDb(param, product, 'products');
        return updatedProduct;
    }

    public async deleteProduct(param: object): Promise<string> {
        const deletedProduct = await deleteFromDb(param, 'products');
        return deletedProduct;
    }
}
export default ProductService;
