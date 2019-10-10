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
    console.log('req.body is', req.body)
    const itemId = req.body.id;
    const queryText = `
    UPDATE "item"
    SET "correct_count" = "correct_count" + 1,
    "number_of_instances" = "number_of_instances" + 1
    WHERE "item".id = $1;
    `;
    pool.query(queryText, [itemId])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in item/correct put', error);
            res.sendStatus(500);
        })
})
//updates database to increment number of instances if initial guess is incorrect
router.put('/incorrect', (req, res) => {
    console.log("req.body is", req.body);
    const itemId = req.body.id;
    const queryText = `
    UPDATE "item"
    SET "number_of_instances" = "number_of_instances" + 1
    WHERE "item".id = $1;
    `;
    pool.query(queryText, [itemId])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in item/incorrect put', error);
            res.sendStatus(500);
        })
})

//WASTE WISE ADMIN PAGE ONLY
//ITEM GET
router.get('/admin', (req, res) => {
    const sqlText = `SELECT * FROM item ORDER BY "name" ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log('Item Admin GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting items from database`, error);
            res.sendStatus(500);
        })
});

//ITEM ADD
router.post('/admin', (req, res) => {
    const sqlText = `INSERT INTO item ("name", "receptacle", "item_text", "url") VALUES ($1, $2, $3, $4);`;
    pool.query(sqlText, [req.body.itemName, req.body.receptacle, req.body.itemText, req.body.url])
        .then((result) => {
            console.log('ADD ITEM POST from database:', result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error POSTing new item:`, error);
            res.sendStatus(500);
        })
})

//ITEM DELETE
router.delete('/admin/:id', (req, res) => {
    const sqlText = `DELETE FROM item WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;