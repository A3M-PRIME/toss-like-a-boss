const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    //get 15 random items from list for the game
    const queryText = `
    SELECT *,(SELECT count(*) FROM "item") AS ct
    FROM "item"
    ORDER BY random()
    LIMIT 15;
    `;
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in item get', error);
            res.sendStatus(500);
        })
})

module.exports = router;