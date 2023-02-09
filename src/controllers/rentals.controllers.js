import { db } from '../database/database.connection.js';

export async function listRentals(req, res) {
  try {
    const result = await db.query(`
    SELECT
        rentals.*,
        customers.id AS "customerId",
        customers.name AS "customerName",
        games.id AS "gameId",
        games.name AS "gameName"
    FROM
        rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
    `);
    const rentals = result.rows.map(
      ({ customerId, customerName, gameId, gameName, ...rental }) => {
        const customer = { id: customerId, name: customerName };
        const game = { id: gameId, name: gameName };
        return { rental, customer, game };
      }
    );
    res.send(rentals);
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
