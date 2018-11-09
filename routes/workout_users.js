const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
	knex('workout_users').then(workout_users => {
			res.json({ workout_users })
		})
})


module.exports = router
