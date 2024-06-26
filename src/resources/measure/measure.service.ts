import { getAllDb } from '@/utils/scripts/sqlQueries';
import Measure from '@/resources/measure/measure.interface';

class MeasureService {
    public async getAllMeasures(): Promise<Measure[]> {
        const measures = await getAllDb('measure_units');
        return measures;
    }
}
export default MeasureService;
