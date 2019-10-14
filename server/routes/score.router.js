const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// router.get("/leaderboard/:id", (req, res) => {
//   const queryText = `SELECT "team".team_name, "score".id, "score".score, "score".contest_id, "score".first_name, "score".last_name, "score".team_id, "score".time FROM score JOIN "team" ON "score".team_id="score".team_id WHERE "score".contest_id=$1 ORDER BY "score".score LIMIT 10;`;
//   contestId = req.params.id;
//   pool
//     .query(queryText, [contestId])
//     .then(results => {
//       console.log(results.rows);
//       res.send(results.rows);
//     })
//     .catch(error => {
//       console.log("error in server side leaderboard GET", error);
//       res.sendStatus(500);
//     });
// });

router.get("/leaderboard/:code", async (req, res) => {
  const code = req.params.code;

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const contest_idQuery = `SELECT id FROM contest WHERE "contest".access_code=$1`;
    const result = await connection.query(contest_idQuery, [code]);
    const contestId = result.rows.id;
    console.log(result.rows);
    const scoreQuery = `SELECT "team".team_name, "score".id, "score".score, "score".first_name, "score".last_name, "score".team_id, "score".time FROM score JOIN "team" ON "score".team_id="score".team_id WHERE "score".contest_id=$1 ORDER BY "score".score LIMIT 10;`;
    await connection.query(scoreQuery, [contestId]);
    await connection.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    console.log("error in server side leaderboard GET", error)
    await connection.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;
