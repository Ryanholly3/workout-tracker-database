const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
	knex('workout_users')
    .then(workout_users => {
		  res.json({ workout_users })
		})
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const intCheck = parseInt(id);

  if(typeof intCheck === 'number'){
    knex('workout_users')
      .where('id', id)
      .then(workout_user => {
        if(!workout_user.length){
          next()
        } res.json({ workout_user: workout_user[0] })
  		})
  }
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('workout_users')
      .insert(body)
      .returning('*')
      .then(workout_user => {
        res.json({ workout_user: workout_user[0] });
    });
});

router.put('/:id', (req, res, next) => {
		const id = req.params.id
    const body = req.body;
    knex('workout_users')
    	.where('id', id)
    	.update(body)
    	.returning('*')
    	.then(workout_user => {
        if(!workout_user.length){
          next()
        } res.json({ workout_user: workout_user[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('workout_users')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(workout_user => {
        if(!workout_user.length){
          next()
        } res.json({ workout_user: workout_user[0] });
    });
});


module.exports = router
