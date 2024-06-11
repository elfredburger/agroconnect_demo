import CompType from '@/utils/interfaces/comptype.interface';
import { getAllDb } from '@/utils/scripts/sqlQueries';
import HttpException from '@/utils/exceptions/http.exception';

class CompTypeService {
    public async getAllCompTypes(): Promise<CompType[]> {
        const compTypes: CompType[] = await getAllDb('company_types');
        return compTypes;
    }
}
export default CompTypeService;
