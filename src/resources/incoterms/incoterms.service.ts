import { getAllDb } from '@/utils/scripts/sqlQueries';
import Incoterms from '@/resources/incoterms/incoterm.interface';

class IncotermsService {
    async getIncoterms(): Promise<Incoterms[]> {
        const incoterms = await getAllDb('incoterms');
        return incoterms;
    }
}
export default IncotermsService;
