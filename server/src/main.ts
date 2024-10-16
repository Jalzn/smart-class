import config from '@/config'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Hello world!' })
})

app.listen(config.port, () => {
	console.log(`Server starting at port ${config.port}`)
})
