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
        if (newProduct === 'Update to Db failed') {
            throw new HttpException(400, newProduct);
        }
        return newProduct;
    }

    public async getProduct(param: object): Promise<Product[]> {
        const product = await getFromDb(param, 'products');
        if (product.length == 0) {
            throw new HttpException(400, 'Product not found');
        }
        return product;
    }

    public async updateProduct(
        param: object,
        product: Product,
    ): Promise<string> {
        const updatedProduct = await updateObjectDb(param, product, 'products');
        if (updatedProduct === 'Update to Db failed') {
            throw new HttpException(400, updatedProduct);
        }
        return updatedProduct;
    }

    public async deleteProduct(param: object): Promise<string> {
        const deletedProduct = await deleteFromDb(param, 'products');
        if (deletedProduct === 'Delete from Db failed') {
            throw new HttpException(400, deletedProduct);
        }

        return deletedProduct;
    }
}
export default ProductService;
