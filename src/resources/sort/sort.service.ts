import { getAllDb } from '@/utils/scripts/sqlQueries';
import Sort from '@/utils/interfaces/sort.interface';
import exp from 'constants';

class SortService {
    public async getAllSorts(): Promise<Sort[]> {
        const sorts = await getAllDb('product_sorts');
        return sorts;
    }
}
export default SortService;
