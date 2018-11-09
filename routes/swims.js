const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
	knex('swim')
    .then(swims => {
		  res.json({ swims })
		})
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
	knex('swim')
    .where('id', id)
    .then(swim => {
      if(!swim.length){
        next()
      } res.json({ swim: swim[0] })
		})
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('swim')
      .insert(body)
      .returning('*')
      .then(swim => {
        res.json({ swim: swim[0] });
    });
});

router.put('/:id', (req, res, next) => {
		const id = req.params.id
    const body = req.body;
    knex('swim')
    	.where('id', id)
    	.update(body)
    	.returning('*')
    	.then(swim => {
        res.json({ swim: swim[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('swim')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(swim => {
        res.json({ swim: swim[0] });
    });
});


module.exports = router
