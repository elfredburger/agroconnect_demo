import { getAllDb } from '@/utils/scripts/sqlQueries';
import Iso from '@/utils/interfaces/iso.interface';
import exp from 'constants';

class IsoService {
    public async getiso(): Promise<Iso[]> {
        const iso = getAllDb('iso_standarts');
        return iso;
    }
}
export default IsoService;
