import Lot from '@/utils/interfaces/lot.interface';
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
        const lots: Lot[] = await getAllDb('lot');
        return lots;
    }

    public async getLots(param: object): Promise<Lot> {
        const lot = await getFromDb(param, 'lot');
        if (!lot) {
            throw new HttpException(409, 'lot not found');
        }
        return lot;
    }

    public async createLot(lot: Lot): Promise<string> {
        const createdLot = await createObjectDb(lot, 'lot');
        return createdLot;
    }

    public async updateLot(param: object, lot: Lot): Promise<string> {
        const updatedLot = await updateObjectDb(param, lot, 'lot');
        if (!updatedLot) {
            throw new HttpException(409, 'lot not found');
        }
        return updatedLot;
    }

    public async deleteLot(param: object): Promise<string> {
        const deletedLot = await deleteFromDb(param, 'lot');
        if (!deletedLot) throw new HttpException(409, 'lot not found');
        return deletedLot;
    }
}

export default LotService;
