const express = require('express');
const router = express.Router();
const pool = require('../public/modules/pool');


// ------GET --getting data from the database-----
router.get('/', (req, res) =>{
    console.log('get hit');
    //get all rows from table
    let queryString = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query( queryString)
    .then((results)=>{
        console.log('getting worked!');
        //send back to client
        res.send(results.rows);
    }).catch((err)=>{
        res.sendStatus(500);
    })//end select
    
})// end get


// -----------POST-- adding to the database----------
router.post('/', (req, res) =>{
    console.log('post hit', req.body);
    // set up querystring
    let queryString = `
    INSERT INTO "tasks" ("todo", "notes")
    VALUES ($1, $2);
    `;
    //RUN QUERY
    pool.query(queryString, [ req.body.todo, req.body.notes])
    .then((results)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log('error saving todo', err);
        res.sendStatus(500);
    })
})// end post


//------ PUT-- marking tasks as completed-------------
router.put('/:id', (req, res) => {
    console.log('in put', req.params);
    let query = `
        UPDATE "tasks" 
        SET  "completed" = true
        WHERE "id" = $1; `
    pool.query(query,[req.params.id] )
    .then(results =>{
        console.log('put router working');
        res.sendStatus(201);
    }).catch(err =>{
        console.log('error in router put', err);
        res.sendStatus(500);
    })
  
  })



//-------- DELETE-- deleting tasks -------------------
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
      console.log('delete id', reqId);
    let queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
      pool.query(queryText, [reqId])
     .then((results) => {
      console.log('book deleted');
      res.sendStatus(201);
  }).catch((error) => {
      console.log('error making database query', error);
      res.sendStatus(500);
  })
})


module.exports = router;