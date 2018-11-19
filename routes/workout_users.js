const express = require('express')
const router = express.Router()
const knex = require('../db/connection')


//Bug in JOIN!!!!!!!!!!!!!!!!!!!!
router.get('/', (req, res) => {

	function getUsers(){
		return knex('workout_users')
			.select('*')
			.first()
	}

	function getSwimsForUser(){
		return knex('workout_users')
		.innerJoin('swim', 'swim.workout_users_id', 'workout_users.id')
		// .where('workout_users.id', 'workout_users_id')
	}

	function getBikesForUser(){
		return knex('workout_users')
			.innerJoin('bike', 'bike.workout_users_id', 'workout_users.id')
	}

	function getRunsForUser(){
		return knex('workout_users')
			.innerJoin('run', 'run.workout_users_id', 'workout_users.id')
	}

	function getUsersWithWorkouts(){
		return Promise.all ([
			getUsers(),
			getSwimsForUser(),
			getBikesForUser(),
			getRunsForUser()
		]).then(function(results) {
			let [user, swims, bikes, runs] = results
			user.swims = swims;
			user.bikes = bikes;
			user.runs = runs;
			return user
		}).then((users)=>{
			res.json({ users })
		})
	}
	getUsersWithWorkouts()
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

router.get('/:id/swims', (req, res, next) => {
  const id = req.params.id;
  const intCheck = parseInt(id);

  if(typeof intCheck === 'number'){
    knex('swim')
      .where('workout_users_id', id)
      .then(workout_user_swims => {
        if(!workout_user_swims.length){
          next()
        } res.json({ workout_user_swims })
  		})
  }
})

router.get('/:id/bikes', (req, res, next) => {
  const id = req.params.id;
  const intCheck = parseInt(id);

  if(typeof intCheck === 'number'){
    knex('bike')
      .where('workout_users_id', id)
      .then(workout_user_bikes => {
        if(!workout_user_bikes.length){
          next()
        } res.json({ workout_user_bikes })
  		})
  }
})

router.get('/:id/runs', (req, res, next) => {
  const id = req.params.id;
  const intCheck = parseInt(id);

  if(typeof intCheck === 'number'){
    knex('run')
      .where('workout_users_id', id)
      .then(workout_user_runs => {
        if(!workout_user_runs.length){
          next()
        } res.json({ workout_user_runs })
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
