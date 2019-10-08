const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");


router.get("/leaderboard", (req, res) => {
  const queryText = `SELECT * FROM score WHERE contest_id=1 ORDER BY score LIMIT 10;`;
  pool
    .query(queryText)
    .then(results => {
        console.log(results.rows)
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side leaderboard GET", error);
      res.sendStatus(500);
    });
});


module.exports = router;