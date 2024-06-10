import Company from '@/utils/interfaces/company.interface';
import {
    getAllDb,
    deleteFromDb,
    createObjectDb,
    updateObjectDb,
    getFromDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '@/utils/exceptions/http.exception';
class CompanyService {
    public async getAllCompanies(): Promise<Company[]> {
        const companies: Company[] = await getAllDb('companies');
        return companies;
    }

    public async getCompany(param: object): Promise<Company> {
        const company = await getFromDb(param, 'companies');
        if (!company) {
            throw new HttpException(409, 'Company not found');
        }
        return company;
    }

    public async createCompany(companyData: Company): Promise<string> {
        const createCompanyData = await createObjectDb(
            companyData,
            'companies',
        );
        return createCompanyData;
    }

    public async updateCompany(
        param: object,
        companyData: Company,
    ): Promise<string> {
        const updateCompanyData = await updateObjectDb(
            param,
            companyData,
            'companies',
        );

        return updateCompanyData;
    }

    public async deleteCompany(param: object): Promise<string> {
        const deleteCompanyData = await deleteFromDb(param, 'companies');
        return deleteCompanyData;
    }
}

export default CompanyService;
