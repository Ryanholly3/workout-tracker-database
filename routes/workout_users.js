const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

function getUsers(){
	return knex('workout_users')
		.select('*')
}

function getSwimsForUser(user){
	return knex('swim')
		.select(knex.raw('swim.id as swim_id, swim.date, swim.distance, swim.difficulty, swim.notes'))
		.innerJoin('workout_users', 'workout_users.id', 'swim.workout_users_id')
		.whereIn('swim.workout_users_id', [user.id])
}

function getBikesForUser(user){
	return knex('bike')
		.select(knex.raw('bike.id as bike_id, bike.date, bike.distance, bike.difficulty, bike.notes'))
		.innerJoin('workout_users', 'workout_users.id', 'bike.workout_users_id')
		.whereIn('bike.workout_users_id', [user.id])
}

function getRunsForUser(user){
	return knex('run')
		.select(knex.raw('run.id as run_id, run.date, run.distance, run.difficulty, run.notes'))
		.innerJoin('workout_users', 'workout_users.id', 'run.workout_users_id')
		.whereIn('run.workout_users_id', [user.id])
}


router.get('/', (req, res) => {

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

	function getUser(){
		return knex('workout_users')
			.select('*')
			.where('id', id)
	}

	function getUserWithWorkouts(){
		return getUser()
			.then(function(users){
				return Promise.all(users.map(async (user)=> {
						user.swims = await getSwimsForUser(user)
						user.bikes = await getBikesForUser(user)
						user.runs = await getRunsForUser(user)
						return user
					})
				)
			}).then(user => {
					if(typeof intCheck === 'number' && user.length > 0){
						res.json({ user })
					} else {
						next()
					}
				})
	}
	getUserWithWorkouts()
})

router.get('/:id/swims', (req, res, next) => {
  const id = req.params.id;
	const intCheck = parseInt(id);

	function getUser(){
		return knex('workout_users')
			.select('*')
			.where('id', id)
	}

	function getUserWithSwims(){
		return getUser()
			.then(function(users){
				return Promise.all(users.map(async (user)=> {
						user.swims = await getSwimsForUser(user)
						return user
					})
				)
			}).then(user => {
					if(typeof intCheck === 'number' && user.length > 0){
						res.json({ user })
					} else {
						next()
					}
				})
	}
	getUserWithSwims()
})

router.get('/:id/bikes', (req, res, next) => {
  const id = req.params.id;
	const intCheck = parseInt(id);

	function getUser(){
		return knex('workout_users')
			.select('*')
			.where('id', id)
	}

	function getUserWithBikes(){
		return getUser()
			.then(function(users){
				return Promise.all(users.map(async (user)=> {
						user.bikes = await getBikesForUser(user)
						return user
					})
				)
			}).then(user => res.json({ user }))
	}
	getUserWithBikes()
})

router.get('/:id/runs', (req, res, next) => {
  const id = req.params.id;
	const intCheck = parseInt(id);

	function getUser(){
		return knex('workout_users')
			.select('*')
			.where('id', id)
	}

	function getUserWithRuns(){
		return getUser()
			.then(function(users){
				return Promise.all(users.map(async (user)=> {
						user.runs = await getRunsForUser(user)
						return user
					})
				)
			}).then(user => {
					if(typeof intCheck === 'number' && user.length > 0){
						res.json({ user })
					} else {
						next()
					}
				})
	}
	getUserWithRuns()
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
