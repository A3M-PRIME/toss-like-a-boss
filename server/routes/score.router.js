const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/leaderboard/:id", (req, res) => {
  const queryText = `SELECT "team".team_name, "score".id, "score".score, "score".contest_id, "score".first_name, "score".last_name, "score".team_id, "score".time FROM score JOIN "team" ON "score".team_id="score".team_id WHERE "score".contest_id=$1 ORDER BY "score".score LIMIT 10;`;
  contestId = req.params.id
  pool
    .query(queryText, [contestId])
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side leaderboard GET", error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const queryText = `
  INSERT into "score" ("first_name", "last_name", "email_address", "score", "time", "contest_id", "team_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;
  pool.query(queryText, [req.body.firstName, req.body.lastName, req.body.email, req.body.score, req.body.time,
  req.body.contestIdNumber, req.body.organizationIdNumber])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error in score router POST', error);
      res.sendStatus(500);
    })
  })

  module.exports = router;
