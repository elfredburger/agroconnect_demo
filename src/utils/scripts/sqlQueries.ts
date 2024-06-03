import client from '../../db';

export async function getUsers(): Promise<any[]> {
    const query = `SELECT * FROM users`;

    const { rows } = await client.query(query);
    return rows;
}
module.exports = { getUsers };
