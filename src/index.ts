import http from 'http'
import router from './routes/index.routes'

import { app } from './config/index'

export const server = http.createServer(app)

import './server'
import './db'

app.use('/api', router())