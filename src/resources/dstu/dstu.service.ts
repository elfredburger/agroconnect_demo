import { getAllDb } from '@/utils/scripts/sqlQueries';
import Dstu from '@/resources/dstu/dstu.interface';

import HttpException from '@/utils/exceptions/http.exception';
class DstuService {
    public async findAll(): Promise<Dstu[]> {
        const dstu = await getAllDb('dstu_standrats');
        return dstu;
    }
}

export default DstuService;
