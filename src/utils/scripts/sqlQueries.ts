import client from '../../db';
import User from '../interfaces/user.interface';

export async function getAllDb(table: string): Promise<any[]> {
    const query = `SELECT * FROM ${client.escapeIdentifier(table)}`;

    const { rows } = await client.query(query);
    return rows;
}
export async function getbyIdDb(id: string, table: string): Promise<User> {
    const query = `SELECT * FROM ${client.escapeIdentifier(table)} WHERE id = $1`;
    const { rows } = await client.query(query, [id]);

    return rows[0];
}
export async function deletebyIdDb(id: string, table: string): Promise<String> {
    const query = `DELETE FROM ${client.escapeIdentifier(table)} WHERE id = $1`;
    await client.query(query, [id]);
    return 'deleted';
}
export async function createObjectDb(
    object: any,
    table: string,
): Promise<string> {
    const keys = Object.keys(object);
    const values = Object.values(object);

    const query = `INSERT INTO ${client.escapeIdentifier(table)} (${keys.map(client.escapeIdentifier).join(', ')}) VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})`;

    await client.query(query, values);

    return 'created';
}
export async function updateObjectDb(
    id: string,
    object: any,
    table: string,
): Promise<string> {
    const keys = Object.keys(object);
    const values = [...Object.values(object), id];

    const query = `UPDATE ${client.escapeIdentifier(table)} SET ${keys
        .map((key, i) => `${client.escapeIdentifier(key)} = $${i + 1}`)
        .join(', ')} WHERE id = $${values.length}`;

    await client.query(query, values);

    return 'updated';
}

module.exports = {
    getAllDb,
    getbyIdDb,
    createObjectDb,
    deletebyIdDb,
    updateObjectDb,
};
