const express = require('express')
const router = express.Router()
const knex = require('../db/connection')


//Bug in JOIN!!!!!!!!!!!!!!!!!!!!
router.get('/', (req, res) => {

	function getUsers(){
		return knex('workout_users')
			.select('*')
	}

	function getSwimsForUser(users){
		return knex('swim')
			.select(knex.raw('swim.id as swim_id, swim.date, swim.distance, swim.difficulty, swim.notes'))
			.innerJoin('workout_users', 'workout_users.id', 'swim.workout_users_id')
			.whereIn('swim.workout_users_id', [users.id])
	}

	function getBikesForUser(users){
		return knex('bike')
			.select(knex.raw('bike.id as bike_id, bike.date, bike.distance, bike.difficulty, bike.notes'))
			.innerJoin('workout_users', 'workout_users.id', 'bike.workout_users_id')
			.whereIn('bike.workout_users_id', [users.id])
	}

	function getRunsForUser(users){
		return knex('run')
			.select(knex.raw('run.id as run_id, run.date, run.distance, run.difficulty, run.notes'))
			.innerJoin('workout_users', 'workout_users.id', 'run.workout_users_id')
			.whereIn('run.workout_users_id', [users.id])
	}

	function getUsersWithWorkouts(){
		return getUsers()
			.then(function(users){
				return Promise.all(users.map(async (user)=> {
						user.swims = await getSwimsForUser(user)
						user.bikes = await getBikesForUser(user)
						user.runs = await getRunsForUser(user)
						return user
					})
				)
			}).then(users => res.json({ users }))
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
