import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './routes/index.routes'

import { app } from './config/index'

export const server = http.createServer(app)

import './server'
import './db'

app.use('/', router())