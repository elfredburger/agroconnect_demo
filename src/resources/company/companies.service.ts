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

    public async getCompanyById(companyId: string): Promise<Company> {
        const company = await getFromDb({ id: companyId }, 'companies');
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
        companyId: string,
        companyData: Company,
    ): Promise<string> {
        console.log(companyData);
        console.log({ id: companyId });
        const updateCompanyData = await updateObjectDb(
            { id: companyId },
            companyData,
            'companies',
        );

        return updateCompanyData;
    }

    public async deleteCompany(companyId: string): Promise<string> {
        const deleteCompanyData = await deleteFromDb(
            { id: companyId },
            'companies',
        );
        return deleteCompanyData;
    }
}

export default CompanyService;
