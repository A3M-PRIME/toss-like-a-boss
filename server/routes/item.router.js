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

// updates database to increment correct count and
// number of instances when an item is correct on
// the first attempt
router.put('/correct', (req, res) => {
    const itemName = req.body.name;
    const queryText = `
    UPDATE "item"
    SET "correct_count" = "correct_count" + 1,
    "number_of_instances" = "number_of_instances" + 1
    WHERE "item".name = $1;
    `;
    pool.query(queryText, [itemName])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in item/correct put', error);
            res.sendStatus(500);
        })
})

router.put('/incorrect', (req, res) => {
    const itemName = req.body.name;
    const queryText = `
    UPDATE "item"
    SET "number_of_instances" = "number_of_instances" + 1
    WHERE "item".name = $1;
    `;
    pool.query(queryText, [itemName])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in item/incorrect put', error);
            res.sendStatus(500);
        })
})

module.exports = router;