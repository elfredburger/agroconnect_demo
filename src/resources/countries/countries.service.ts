import { getAllDb } from '@/utils/scripts/sqlQueries';
import Country from '@/resources/countries/country.interface';

class CountriesService {
    async getAllCountries(): Promise<Country[]> {
        const countries = await getAllDb('product_countries');
        return countries;
    }
}
export default CountriesService;
