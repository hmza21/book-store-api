import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const client = new pg.Client(process.env.DB_URL)

export default client
