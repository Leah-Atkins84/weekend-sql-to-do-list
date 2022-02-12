const express = require('express');
const router = express.Router();
const pool = require('../public/modules/pool');


// ------GET --getting data from the database-----
router.get('/', (req, res) =>{
    console.log('get hit');
    res.send('bark');
})// end get


// -----------POST-- adding to the database----------
router.post('/', (req, res) =>{
    console.log('post hit', req.body);
    res.send('meow');
})// end post


//------ PUT-- marking tasks as completed-------------




//-------- DELETE-- deleting tasks -------------------

module.exports = router;