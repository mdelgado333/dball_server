import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const app = express()

app.use(
    cors({
        origin: ['http://192.168.1.14:8080', 'http://localhost:3000'], // Adjust if needed
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(compression())
app.use(cookieParser())
app.use(express.json())