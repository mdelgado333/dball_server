import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL || "mongodb+srv://dballdesarrollatujuego:qDMykNCTOnsMpmSl@dball.4n1wm.mongodb.net/?retryWrites=true&w=majority&appName=DBALL";

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))