import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Logger from '../config/logger.js'


const app = express()

global.logger = Logger.createLogger({ label: 'orangeGroup' })

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: logger.stream }))

export default app