const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const cors = require('cors')
const bodyParser = require('body-parser')
const usersPath = requite('./routes/users')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
	res.send('🐻🐻🐻🐻🐻🐻🐻')
})

app.use('/users', usersPath)


// error handling
app.use(notFound)
app.use(errorHandler)

function notFound(req,res,next) {
  res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl });
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl })
}


app.listen(port, () => console.log(`Running on port ${port}`))
