const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get ("/leaderboard/:id", (req, res) => {
    const queryText = `
    SELECT * from contest
    WHERE contest_id=1
    SORT BY score
    LIMIT 10;`;
})


module.exports = router;