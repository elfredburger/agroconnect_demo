import Lot from '@/resources/lots/lot.interface';
import {
    getAllDb,
    deleteFromDb,
    createObjectDb,
    updateObjectDb,
    getFromDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '@/utils/exceptions/http.exception';

class LotService {
    public async getAllLots(): Promise<Lot[]> {
        const lots: Lot[] = await getAllDb('lots');
        return lots;
    }

    public async getLots(param: object): Promise<Lot> {
        const lot = await getFromDb(param, 'lots');
        if (!lot) {
            throw new HttpException(409, 'lot not found');
        }
        return lot[0];
    }

    public async createLot(lot: Lot): Promise<string> {
        const createdLot = await createObjectDb(lot, 'lots');
        return createdLot;
    }

    public async updateLot(param: object, lot: Lot): Promise<string> {
        const updatedLot = await updateObjectDb(param, lot, 'lots');
        if (!updatedLot) {
            throw new HttpException(409, 'lot not found');
        }
        return updatedLot;
    }

    public async deleteLot(param: object): Promise<string> {
        const deletedLot = await deleteFromDb(param, 'lots');
        if (!deletedLot) throw new HttpException(409, 'lot not found');
        return deletedLot;
    }
}

export default LotService;
