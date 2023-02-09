import { db } from '../database/database.connection.js';

export async function listRentals(_req, res) {
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
  const { customerId, gameId, daysRented } = req.body;
  try {
    const existingGame = await db.query('SELECT * FROM games WHERE id = $1', [
      gameId,
    ]);
    if (existingGame.rowCount !== 1) {
      return res.sendStatus(400);
    }

    const existingCustomer = await db.query(
      'SELECT * FROM customers WHERE id = $1',
      [customerId]
    );
    if (existingCustomer.rowCount !== 1) {
      return res.sendStatus(400);
    }

    const openRentals = await db.query(
      'SELECT * FROM rentals WHERE "gameId" = $1',
      [gameId]
    );

    const checkStock = await db.query(
      'SELECT "stockTotal" FROM games WHERE id = $1',
      [gameId]
    );
    if (checkStock.rows[0].stockTotal <= openRentals.rowCount) {
      return res.sendStatus(400);
    }

    const rental = await db.query(
      `
    INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
    VALUES ($1, $2, $3, NOW(), (SELECT "pricePerDay" FROM games WHERE id = $2) * $3);
    `,
      [customerId, gameId, daysRented]
    );

    if (rental.rowCount === 1) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function finishRental(req, res) {
  res.sendStatus(200);
}

export async function deleteRental(req, res) {
  const rentalId = Number(req.params.id);
  if (!rentalId || rentalId < 1 || !Number.isSafeInteger(rentalId)) {
    return res.sendStatus(400);
  }
  try {
    const rentalExists = await db.query('SELECT * FROM rentals WHERE id = $1', [
      rentalId,
    ]);
    if (rentalExists.rowCount !== 1) {
      return res.sendStatus(404);
    }
    const rentalIsFinished = await db.query(
      'SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT NULL',
      [rentalId]
    );
    if (rentalIsFinished.rowCount !== 1) {
      return res.sendStatus(400);
    }
    const deleteRental = await db.query('DELETE FROM rentals WHERE id = $1', [
      rentalId,
    ]);
    if (deleteRental.rowCount === 1) {
      return res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
