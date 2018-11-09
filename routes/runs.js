const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
	knex('run')
    .then(runs => {
		  res.json({ runs })
		})
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
	knex('run')
    .where('id', id)
    .then(run => {
      if(!run.length){
        next()
      } res.json({ run: run[0] })
		})
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('run')
      .insert(body)
      .returning('*')
      .then(run => {
        res.json({ run: run[0] });
    });
});

router.put('/:id', (req, res, next) => {
		const id = req.params.id
    const body = req.body;
    knex('run')
    	.where('id', id)
    	.update(body)
    	.returning('*')
    	.then(run => {
        res.json({ run: run[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('run')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(run => {
        res.json({ run: run[0] });
    });
});


module.exports = router
