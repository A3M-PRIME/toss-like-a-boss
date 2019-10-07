const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get ("/leaderboard/:id", (req, res) => {
    const queryText = `
    SELECT * from contest`
})


module.exports = router;