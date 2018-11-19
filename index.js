const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const usersPath = require('./routes/workout_users')
const swimsPath = require('./routes/swims')
const bikesPath = require('./routes/bikes')
const runsPath = require('./routes/runs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
	res.send('Workout Tracker API!')
})

app.use('/workout_users', usersPath)
app.use('/swims', swimsPath)
app.use('/bikes', bikesPath)
app.use('/runs', runsPath)

// error handling
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl });
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err);
    const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined;
    res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}


app.listen(port, () => console.log(`Running on port ${port}`))
