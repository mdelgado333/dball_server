import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

export const app = express()

app.use(
    cors({
    credentials: true
}));

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())