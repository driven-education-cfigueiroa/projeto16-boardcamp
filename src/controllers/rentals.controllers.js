import { db } from '../database/database.connection.js';

export async function listRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT
      rentals.*,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,
      json_build_object('id', games.id, 'name', games.name) AS game
    FROM
      rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id;
    `);
    res.send(rentals.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function insertRental(req, res) {
  res.sendStatus(200);
}

export async function finishRental(req, res) {
  res.sendStatus(200);
}

export async function deleteRental(req, res) {
  res.sendStatus(200);
}
