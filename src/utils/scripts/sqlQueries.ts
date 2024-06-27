import client from '../../db';
export async function getAllDb(table: string): Promise<any[]> {
    const query = `SELECT * FROM ${client.escapeIdentifier(table)}`;
    const { rows } = await client.query(query);
    return rows;
}
//`DELETE FROM companies WHERE id = $1 AND name = $2`;
export async function deleteFromDb(
    params: object,
    table: string,
): Promise<string> {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const query = `DELETE FROM ${client.escapeIdentifier(table)} 
        WHERE ${keys.map((key, i) => `${client.escapeIdentifier(key)}= $${i + 1}`).join(' AND ')}`;

    const builtQuery = await client.query(query, values);

    if (builtQuery.rowCount != null && builtQuery.rowCount <= 0) {
        return 'Delete from Db failed';
    }
    return 'Delete successful';
}

//`INSERT INTO companies (name,type) VALUES ($1, $2)`;
export async function createObjectDb(
    object: any,
    table: string,
): Promise<string> {
    const keys = Object.keys(object);
    const values = Object.values(object);

    const query = `INSERT INTO ${client.escapeIdentifier(table)} 
    (${keys.map(client.escapeIdentifier).join(', ')}) VALUES
     (${values.map((_, i) => `$${i + 1}`).join(', ')})`;

    const builtQuery = await client.query(query, values);
    console.log(builtQuery);
    if (builtQuery.rowCount != null && builtQuery.rowCount <= 0) {
        return 'Create to Db failed';
    }

    return 'Create successful';
}

export async function updateObjectDb(
    params: object,
    object: object,
    table: string,
): Promise<string> {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const paramkeys = Object.keys(params);
    const paramvalues = Object.values(params);

    const query = `UPDATE ${client.escapeIdentifier(table)} SET ${keys
        .map((key, i) => `${client.escapeIdentifier(key)} = $${i + 1}`)
        .join(', ')} WHERE ${paramkeys
        .map(
            (key, i) =>
                `${client.escapeIdentifier(key)} = $${keys.length + i + 1}`,
        )
        .join(' AND ')}`;

    ('Update companies SET name = $1,type = $2 WHERE id = $3');

    const dbquery = await client.query(query, [...values, ...paramvalues]);
    if (dbquery.rowCount != null && dbquery.rowCount <= 0) {
        return 'Update to Db failed';
    }
    return 'Update successful';
}
export async function getFromDb(params: object, table: string): Promise<any[]> {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const query = `
    SELECT * FROM ${client.escapeIdentifier(table)} 
    WHERE ${keys.map((key, i) => `${client.escapeIdentifier(key)} = $${i + 1}`).join(' AND ')}
  `;

    const { rows } = await client.query(query, values);

    return rows;
}

export async function getFieldsFromDb(
    params: object,
    table: string,
): Promise<any[]> {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const query = `SELECT ${keys
        .map((key, i) => `${client.escapeIdentifier(key)} `)

        .join(' , ')} FROM ${client.escapeIdentifier(table)}`;

    const { rows } = await client.query(query);
    return rows;
}

module.exports = {
    getAllDb,
    createObjectDb,
    deleteFromDb,
    updateObjectDb,
    getFromDb,
    getFieldsFromDb,
};
