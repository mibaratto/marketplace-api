import 'dotenv/config'
import mongoose from 'mongoose'

console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL)

export default mongoose.connection
