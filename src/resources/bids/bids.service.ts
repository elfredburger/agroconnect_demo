import Company from '@/resources/company/company.interface';
import {
    getAllDb,
    deleteFromDb,
    createObjectDb,
    updateObjectDb,
    getFromDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '@/utils/exceptions/http.exception';
import Bid from '@/resources/bids/bid.interface';

class BidService {
    public async getAllBids(): Promise<Bid[]> {
        const bids = await getAllDb('bids');
        return bids;
    }

    public async getBid(param: object): Promise<Bid[]> {
        const bid = await getFromDb(param, 'bids');
        if (bid.length == 0) throw new HttpException(409, "Bid doesn't exist");
        return bid;
    }

    public async createBid(bid: Bid): Promise<string> {
        const createdBidData = await createObjectDb(bid, 'bids');
        return createdBidData;
    }

    public async updateBid(param: object, bid: Bid): Promise<string> {
        const updatedBidData = await updateObjectDb(param, bid, 'bids');
        return updatedBidData;
    }

    public async deleteBid(param: object): Promise<string> {
        const deletedBidData = await deleteFromDb(param, 'bids');

        return deletedBidData;
    }
}
export default BidService;
