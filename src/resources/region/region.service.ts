import { getAllDb } from '@/utils/scripts/sqlQueries';
import Region from '@/utils/interfaces/region.interface';

class RegionService {
    public async getRegions(): Promise<Region[]> {
        const regions = await getAllDb('product_regions');
        return regions;
    }
}
export default RegionService;
