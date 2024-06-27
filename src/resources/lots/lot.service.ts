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

    public async getLots(param: object): Promise<Lot[]> {
        const lot = await getFromDb(param, 'lots');
        if (lot.length == 0) {
            throw new HttpException(400, 'Lot not found');
        }
        return lot;
    }

    public async createLot(lot: Lot): Promise<string> {
        const createdLot = await createObjectDb(lot, 'lots');
        if (createdLot === 'Create to Db failed') {
            throw new HttpException(400, createdLot);
        }
        return createdLot;
    }

    public async updateLot(param: object, lot: Lot): Promise<string> {
        const updatedLot = await updateObjectDb(param, lot, 'lots');
        if (updatedLot === 'Update to Db failed') {
            throw new HttpException(400, updatedLot);
        }
        return updatedLot;
    }

    public async deleteLot(param: object): Promise<string> {
        const deletedLot = await deleteFromDb(param, 'lots');
        if (deletedLot === 'Delete from Db failed') {
            throw new HttpException(400, deletedLot);
        }
        return deletedLot;
    }
}

export default LotService;
