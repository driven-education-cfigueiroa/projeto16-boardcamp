import { db } from '../database/database.connection.js';

export async function insertGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  try {
    const existingGame = await db.query('SELECT * FROM games WHERE name = $1', [
      name,
    ]);
    if (existingGame.rowCount > 0) {
      return res.sendStatus(409);
    }
    const result = await db.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(400);
    }
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function listGames(_req, res) {
  try {
    const result = await db.query('SELECT * FROM games');
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}
