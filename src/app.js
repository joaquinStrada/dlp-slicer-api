import express from 'express'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import cors from 'cors'
import { config } from './lib/config'
import apiRoutes from './routes/api.routes'

// Swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options as swaggerOptions } from './lib/swaggerOptions'

// initializations
const app = express()

// settings
app.set('port', config.express.port)

// Middelwares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())

// routes
app.use('/api', cors(config.cors), apiRoutes)

// swaggerUI
const specs = swaggerJsDoc(swaggerOptions)

app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

export default app
