import { getAllDb } from '@/utils/scripts/sqlQueries';
import ProductType from '@/utils/interfaces/ptype.interface';
import exp from 'constants';

class ProductTypeService {
    public async getTypes(): Promise<ProductType[]> {
        const productType = await getAllDb('product_type');
        return productType;
    }
}
export default ProductTypeService;
