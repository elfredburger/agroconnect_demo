import {
    createObjectDb,
    deleteFromDb,
    getAllDb,
    getFromDb,
    updateObjectDb,
} from '@/utils/scripts/sqlQueries';
import Permission from '@/resources/company_permissions/permissions.interface';
import HttpException from '@/utils/exceptions/http.exception';

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
        if (updatedPermission === 'Update to Db failed') {
            throw new HttpException(400, updatedPermission);
        }
        return updatedPermission;
    }

    public async getPermissions(params: object): Promise<Permission[]> {
        const permissions = await getFromDb(params, 'permissions');
        if (permissions.length == 0) {
            throw new HttpException(400, ' Company Permissions not found');
        }
        return permissions;
    }

    public async deletePermission(params: object): Promise<String> {
        const deletedPermission = await deleteFromDb(params, 'permissions');
        if (deletedPermission === 'Delete from Db failed') {
            throw new HttpException(400, deletedPermission);
        }
        return deletedPermission;
    }

    public async createPermission(permission: Permission): Promise<String> {
        const createdPermission = await createObjectDb(
            permission,
            'permissions',
        );
        if (createdPermission === 'Create to Db failed') {
            throw new HttpException(400, createdPermission);
        }
        return createdPermission;
    }
}
