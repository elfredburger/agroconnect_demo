import {
    createObjectDb,
    deleteFromDb,
    getAllDb,
    getFromDb,
    updateObjectDb,
} from '@/utils/scripts/sqlQueries';
import Permission from '@/utils/interfaces/permissions.interface';

export class CompanyPermissionService {
    public async getAllPermissions(): Promise<Permission[]> {
        const permissions = await getAllDb('permissions');
        return permissions;
    }

    public async updatePermission(
        params: object,
        permission: Permission,
    ): Promise<String> {
        const updatedPermission = await updateObjectDb(
            params,
            permission,
            'permissions',
        );
        return updatedPermission;
    }

    public async getCompanyPermissions(params: object): Promise<Permission[]> {
        const permissions = await getFromDb(params, 'permissions');
        return permissions;
    }

    public async getUserPermissions(params: object): Promise<Permission[]> {
        const permissions = await getFromDb(params, 'permissions');
        return permissions;
    }

    public async getUserPermissionsByCompany(
        params: object,
    ): Promise<Permission[]> {
        const permissions = await getFromDb(params, 'permissions');
        return permissions;
    }

    public async deletePermission(params: object): Promise<String> {
        const deletedPermission = await deleteFromDb(params, 'permissions');
        return deletedPermission;
    }

    public async createPermission(permission: Permission): Promise<String> {
        const createdPermission = await createObjectDb(permission, 'permissions');
        return createdPermission;
    }
}
