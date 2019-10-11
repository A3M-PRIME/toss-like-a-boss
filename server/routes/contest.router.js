const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//CONTEST DATA GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM contest WHERE organization_id = $1
                    ORDER BY contest_name ASC;`;
    pool.query(sqlText, [req.user.organization_id])
        .then((result) => {
            console.log('Organization GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting organization from database`, error);
            res.sendStatus(500);
        })
});

//CONTEST INFO PUT
router.put('/', (req, res) => {
    const sqlText = `UPDATE contest
                    SET "contest_name" = $1, "start_date" = $2, "start_time" = $3, "end_date" = $4, "end_time" = $5
                    WHERE "id" = $6;`;
    pool.query(sqlText, [req.body.contestName, req.body.contestStartDate, req.body.contestStartTime, req.body.contestEndDate, req.body.contestEndTime, req.body.contestNameId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//CONTEST DELETE
router.delete('/:id', (req, res) => {
    const sqlText = `DELETE FROM contest WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;