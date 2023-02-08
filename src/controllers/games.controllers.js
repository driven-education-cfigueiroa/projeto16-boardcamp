import { db } from '../database/database.connection.js';

export async function insertGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(400);
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function listGames(req, res) {
  try {
    const result = await db.query('SELECT * FROM games');
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
