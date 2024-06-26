import { getAllDb } from '@/utils/scripts/sqlQueries';
import ProductType from '@/resources/product_type/ptype.interface';
import exp from 'constants';

class ProductTypeService {
    public async getTypes(): Promise<ProductType[]> {
        const productType = await getAllDb('product_type');
        return productType;
    }
}
export default ProductTypeService;
