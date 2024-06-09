import client from '../../db';
export async function getAllDb(table: string): Promise<any[]> {
    const query = `SELECT * FROM ${client.escapeIdentifier(table)}`;

    const { rows } = await client.query(query);
    return rows;
}

export async function deleteFromDb(
    params: object,
    table: string,
): Promise<string> {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const query = `DELETE FROM ${client.escapeIdentifier(table)} WHERE ${keys
        .map((key, i) => `${client.escapeIdentifier(key)} = $${i + 1}`)
        .join(' AND ')}`;
    await client.query(query, values);
    return 'deleted';
}
export async function createObjectDb(
    object: any,
    table: string,
): Promise<string> {
    const keys = Object.keys(object);
    const values = Object.values(object);

    const query = `INSERT INTO ${client.escapeIdentifier(table)} 
    (${keys.map(client.escapeIdentifier).join(', ')}) VALUES
     (${values.map((_, i) => `$${i + 1}`).join(', ')})`;

    await client.query(query, values);

    return 'created';
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

    await client.query(query, [...values, ...paramvalues]);

    return 'updated';
}
export async function getFromDb(params: object, table: string): Promise<any> {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const query = `SELECT * FROM ${client.escapeIdentifier(table)} WHERE ${keys
        .map((key, i) => `${client.escapeIdentifier(key)} = $${i + 1}`)
        .join(' AND ')}`;
    const { rows } = await client.query(query, values);
    return rows;
}

module.exports = {
    getAllDb,
    createObjectDb,
    deleteFromDb,
    updateObjectDb,
    getFromDb,
};
