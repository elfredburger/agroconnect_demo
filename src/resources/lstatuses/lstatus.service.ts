import { getAllDb } from '@/utils/scripts/sqlQueries';
import ListingStatus from '@/resources/lstatuses/lstatus.interface';

class ListingStatusService {
    public async getstatus(): Promise<ListingStatus[]> {
        const db = await getAllDb('listing_statuses');
        return db;
    }
}
export default ListingStatusService;
