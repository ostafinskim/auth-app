import * as schema from '@/db/schema'
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	max: 10,
	idleTimeoutMillis: 30000
})

export const db = drizzle(pool, { schema, casing: 'snake_case' })