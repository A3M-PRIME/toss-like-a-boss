const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//TEAM DATA GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM team WHERE organization_id = $1 ORDER BY team_name ASC;`;
    pool.query(sqlText, [req.user.organization_id])
        .then((result) => {
            console.log('Team GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting teams from database`, error);
            res.sendStatus(500);
        })
});

//TEAM NAME PUT
router.put('/teamName', (req, res) => {
    const sqlText = `UPDATE team
    SET team_name = $1
    WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.teamName, req.body.teamNameId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//TEAM DELETE
router.delete('/:id', (req, res) => {
    const sqlText = `DELETE FROM team WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//NEW TEAM POST
router.post('/', (req, res) => {
    const sqlText = `INSERT INTO team ("team_name", "organization_id") VALUES ($1, $2);`;
    pool.query(sqlText, [req.body.teamName, req.user.organization_id])
        .then((result) => {
            console.log('ADD TEAM POST from database:', result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error POSTing new team:`, error);
            res.sendStatus(500);
        })
})

//route to get team names from database
router.get('/names/:id', (req, res) => {
    const sqlText = `
    SELECT * FROM "team"
    JOIN "organization" on "organization".id = "team".organization_id
    JOIN "contest" on "contest".organization_id = "organization".id
    WHERE "contest".access_code = $1;
    `;
    pool.query(sqlText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error in GET team names', error);
        res.sendStatus(500);
    })
})

module.exports = router