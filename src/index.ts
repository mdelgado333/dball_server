import http from 'http'
import router from './routes/index.routes'
import dotenv from 'dotenv';
dotenv.config();

import { app } from './config/index'

export const server = http.createServer(app)

import './server'
import './db'

app.use('/api', router())