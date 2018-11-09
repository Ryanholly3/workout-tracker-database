const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
	knex('bike')
    .then(bikes => {
		  res.json({ bikes })
		})
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
	knex('bike')
    .where('id', id)
    .then(bike => {
		  res.json({ bike: bike[0] })
		})
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('bike')
      .insert(body)
      .returning('*')
      .then(bike => {
        res.json({ bike: bike[0] });
    });
});

router.put('/:id', (req, res, next) => {
		const id = req.params.id
    const body = req.body;
    knex('bike')
    	.where('id', id)
    	.update(body)
    	.returning('*')
    	.then(bike => {
        res.json({ bike: bike[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('bike')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(bike => {
        res.json({ bike: bike[0] });
    });
});


module.exports = router
