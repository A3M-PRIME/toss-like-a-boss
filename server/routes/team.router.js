const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//TEAM DATA GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM team WHERE organization_id = $1;`;
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

module.exports = router